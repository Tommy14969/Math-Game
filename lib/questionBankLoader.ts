import { Grade, Difficulty, Question, Level, LevelStatus } from '@/types';
import { shuffleArray } from './data';
import { getQuestionsCount } from './levelConfig';

/**
 * 为填空题生成干扰选项
 */
function generateDistractors(correctAnswer: number): number[] {
  const distractors: number[] = [];
  const usedValues = new Set<number>([correctAnswer]);

  // 根据答案类型生成不同范围的干扰项
  const isDecimal = !Number.isInteger(correctAnswer);
  const precision = isDecimal ? 2 : 0;

  while (distractors.length < 3) {
    let distractor: number;

    if (isDecimal) {
      // 小数答案：生成±0.5到±2范围内的干扰项
      const offset = (Math.floor(Math.random() * 4) + 1) * 0.5 * (Math.random() > 0.5 ? 1 : -1);
      distractor = parseFloat((correctAnswer + offset).toFixed(precision));
    } else {
      // 整数答案：生成±1到±5范围内的干扰项
      const offset = Math.floor(Math.random() * 5) + 1;
      distractor = correctAnswer + (Math.random() > 0.5 ? offset : -offset);
    }

    // 确保不重复且不为负数（答案应该为正）
    if (!usedValues.has(distractor) && distractor > 0) {
      usedValues.add(distractor);
      distractors.push(distractor);
    }
  }

  return distractors;
}

// 题库缓存
const questionBankCache = new Map<string, Question[]>();

// 题库文件路径
const QUESTION_BANK_PATH = '/questions'; // 在public文件夹中

// 已见题目集合（用于去重）- 按年级和难度分组
const seenQuestionsByGradeDifficulty = new Map<string, Set<string>>();

// 获取当前年级和难度的seenQuestions集合
function getSeenQuestionsSet(grade: Grade, difficulty: Difficulty): Set<string> {
  const key = `${grade}_${difficulty}`;
  if (!seenQuestionsByGradeDifficulty.has(key)) {
    seenQuestionsByGradeDifficulty.set(key, new Set<string>());
  }
  return seenQuestionsByGradeDifficulty.get(key)!;
}

/**
 * 加载指定年级和难度的题目
 */
export async function loadQuestionBank(
  grade: Grade,
  difficulty: Difficulty
): Promise<Question[]> {
  const cacheKey = `${grade}_${difficulty}`;

  // 如果已缓存，直接返回
  if (questionBankCache.has(cacheKey)) {
    return questionBankCache.get(cacheKey)!;
  }

  try {
    // 构建文件路径
    const gradeNum = grade;
    const diffMap = {
      [Difficulty.Basic]: 'basic',
      [Difficulty.Advanced]: 'advanced',
      [Difficulty.Olympiad]: 'olympic',  // 注意：是olympic不是olympiad
    };
    const diffStr = diffMap[difficulty];
    const fileName = `G${gradeNum}_${diffStr}.json`;
    const filePath = `${QUESTION_BANK_PATH}/${fileName}`;

    // 读取文件
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${fileName}`);
    }

    const data = await response.json();

    // 转换题目格式
    const questions: Question[] = data.questions.map((q: any) => {
      // 处理fill类型题目（填空题）- 自动生成选项
      let options = q.options;
      if (q.type === 'fill' && !options) {
        const correctAnswer = parseFloat(q.answer);
        // 生成3个干扰选项
        const distractors = generateDistractors(correctAnswer);
        options = shuffleArray([correctAnswer, ...distractors]);
      }

      return {
        id: q.id,
        grade,
        difficulty,
        type: q.type === 'fill' ? 'choice' : q.type, // 统一转换为choice类型
        question: q.question,
        options: options,
        answer: typeof q.answer === 'string' ? parseFloat(q.answer) : q.answer, // 支持小数答案
        points: 10,
        timeLimit: 30,
        hint: q.hint || '',
        explanation: q.explanation || '',
      };
    });

    // 缓存题目
    questionBankCache.set(cacheKey, questions);

    return questions;
  } catch (error) {
    console.error('Error loading question bank:', error);
    // 如果加载失败，返回空数组
    return [];
  }
}

/**
 * 根据关卡ID从题库中获取题目
 */
export async function getQuestionsFromBank(
  grade: Grade,
  difficulty: Difficulty,
  levelNumber: number,
  levelId: string
): Promise<Question[]> {
  const questionsCount = getQuestionsCount(grade);

  // 加载题库
  const allQuestions = await loadQuestionBank(grade, difficulty);

  console.log(`[DEBUG] Grade ${grade}, Difficulty ${difficulty}, Level ${levelNumber}`);
  console.log(`[DEBUG] Total questions loaded: ${allQuestions.length}`);

  if (allQuestions.length === 0) {
    console.warn('No questions found in question bank, using generated questions');
    // 如果题库为空，使用生成的题目
    const { generateQuestionsForLevel } = await import('./questionGenerator');
    return generateQuestionsForLevel(grade, difficulty, levelNumber, levelId);
  }

  // 根据关卡类型筛选题目
  // 首先筛选出所有选择题（有4个选项）
  let filteredQuestions = allQuestions.filter(q =>
    q.options && Array.isArray(q.options) && q.options.length === 4 && q.type === 'choice'
  );

  // 过滤掉质量低下的题目（包含图片但没有实际图片的题目）
  const beforeImageFilter = filteredQuestions.length;
  filteredQuestions = filteredQuestions.filter(q => {
    const questionText = q.question || '';
    // 排除包含"图中有"但没有image字段的题目
    if (questionText.includes('图中有') || questionText.includes('看图') || questionText.includes('如下图')) {
      return false; // 过滤掉需要图片的题目
    }
    return true;
  });

  if (beforeImageFilter !== filteredQuestions.length) {
    console.log(`[DEBUG] Filtered out ${beforeImageFilter - filteredQuestions.length} questions requiring images`);
  }

  console.log(`[DEBUG] Filtered choice questions (4 options): ${filteredQuestions.length}`);

  // 根据关卡和难度进一步筛选
  if (difficulty === Difficulty.Basic) {
    // 基础难度：严格按照关卡类型过滤
    if (levelNumber === 1) {
      // 第一关：快乐的加法 - 只选加法题目
      const additionQuestions = filteredQuestions.filter(q => q.question.includes('+'));
      console.log(`[DEBUG] Addition questions for level 1: ${additionQuestions.length}`);
      if (additionQuestions.length >= questionsCount) {
        filteredQuestions = additionQuestions;
      } else {
        console.warn(`[WARNING] Not enough addition questions (${additionQuestions.length}), using all available questions`);
        filteredQuestions = additionQuestions.length > 0 ? additionQuestions : filteredQuestions;
      }
    } else if (levelNumber === 2) {
      // 第二关：减法小能手 - 只选减法题目
      const subtractionQuestions = filteredQuestions.filter(q => q.question.includes(' - '));
      console.log(`[DEBUG] Subtraction questions for level 2: ${subtractionQuestions.length}`);
      if (subtractionQuestions.length >= questionsCount) {
        filteredQuestions = subtractionQuestions;
      } else {
        console.warn(`[WARNING] Not enough subtraction questions (${subtractionQuestions.length}), using all available questions`);
        filteredQuestions = subtractionQuestions.length > 0 ? subtractionQuestions : filteredQuestions;
      }
    }
    // 第三关：加减大挑战 - 所有选择题都可用
  }
  // 进阶和奥数难度：所有选择题都可用，不需要额外过滤

  // 获取当前年级和难度的seenQuestions集合
  const seenQuestions = getSeenQuestionsSet(grade, difficulty);

  // 过滤掉已见题目
  const availableQuestions = filteredQuestions.filter(q =>
    !seenQuestions.has(q.id)
  );

  console.log(`[DEBUG] Available questions (not seen): ${availableQuestions.length}`);
  console.log(`[DEBUG] Questions needed: ${questionsCount}`);

  // 如果可用题目不足，从所有题目中随机补充
  let selectedQuestions: Question[];
  if (availableQuestions.length >= questionsCount) {
    // 随机选择题目
    selectedQuestions = shuffleArray([...availableQuestions]).slice(0, questionsCount);
    console.log(`[DEBUG] Selected ${selectedQuestions.length} questions from available pool`);
  } else {
    // 题目不足，使用所有可用题目，然后从已见题目中补充
    selectedQuestions = [...availableQuestions];
    const remainingCount = questionsCount - selectedQuestions.length;

    const unusedSeen = allQuestions.filter(q =>
      seenQuestions.has(q.id) && !selectedQuestions.includes(q)
    );

    const additional = shuffleArray(unusedSeen).slice(0, remainingCount);
    selectedQuestions.push(...additional);
    console.log(`[DEBUG] Used all available (${selectedQuestions.length - additional.length}) + ${additional.length} from seen`);
  }

  // 标记为已见
  selectedQuestions.forEach(q => seenQuestions.add(q.id));

  console.log(`Loaded ${selectedQuestions.length} questions for ${levelId} (available: ${availableQuestions.length})`);

  return selectedQuestions;
}

/**
 * 清空已见题目缓存（开始新游戏时）
 * @param grade 可选，指定年级
 * @param difficulty 可选，指定难度
 * 如果都不指定，清空所有缓存
 * 如果只指定grade，清空该年级所有难度
 * 如果都指定，只清空该年级该难度
 */
export function clearSeenQuestions(grade?: Grade, difficulty?: Difficulty): void {
  if (grade && difficulty) {
    // 清空特定年级和难度
    const key = `${grade}_${difficulty}`;
    seenQuestionsByGradeDifficulty.delete(key);
  } else if (grade) {
    // 清空特定年级的所有难度
    for (const diff of [Difficulty.Basic, Difficulty.Advanced, Difficulty.Olympiad]) {
      const key = `${grade}_${diff}`;
      seenQuestionsByGradeDifficulty.delete(key);
    }
  } else {
    // 清空所有缓存
    seenQuestionsByGradeDifficulty.clear();
  }
}

/**
 * 为所有年级生成关卡数据
 */
export function generateAllLevels(): Level[] {
  const levels: Level[] = [];

  for (let grade = 1; grade <= 6; grade++) {
    // 为每个难度生成3关
    const difficulties: Difficulty[] = [Difficulty.Basic, Difficulty.Advanced, Difficulty.Olympiad];

    difficulties.forEach((difficulty) => {
      for (let levelNum = 1; levelNum <= 3; levelNum++) {
        const isUnlocked = levelNum === 1 && difficulty === Difficulty.Basic;
        const levelId = `grade${grade}-${difficulty}-${levelNum}`;

        const titles = ['快乐的加法', '减法小能手', '加减大挑战'];
        const descriptions = [
          '学习简单的加法运算',
          '掌握基础的减法运算',
          '混合练习加减法'
        ];

        // 根据难度调整关卡信息
        let title = titles[levelNum - 1];
        let description = descriptions[levelNum - 1];

        if (difficulty === Difficulty.Advanced) {
          title = `${titles[levelNum - 1]}（进阶）`;
          description = `${descriptions[levelNum - 1]} - 更有挑战`;
        } else if (difficulty === Difficulty.Olympiad) {
          title = `${titles[levelNum - 1]}（奥数）`;
          description = `${descriptions[levelNum - 1]} - 奥数训练`;
        }

        // 根据难度调整所需分数
        const requiredScore = {
          [Difficulty.Basic]: 60 + (levelNum * 5),
          [Difficulty.Advanced]: 70 + (levelNum * 5),
          [Difficulty.Olympiad]: 80 + (levelNum * 5),
        };

        levels.push({
          id: levelId,
          grade: grade as any,
          difficulty: difficulty,
          levelNumber: levelNum,
          title,
          description,
          questions: [], // 将在游戏开始时加载
          totalStars: 3,
          earnedStars: 0,
          status: (isUnlocked ? LevelStatus.Unlocked : LevelStatus.Locked) as any,
          requiredScore: requiredScore[difficulty],
          timeLimit: (grade + 5) * 30, // 根据年级调整时间
        });
      }
    });
  }

  return levels;
}

/**
 * 获取指定年级的关卡
 */
export function getLevelsForGrade(grade: Grade): Level[] {
  const allLevels = generateAllLevels();
  return allLevels.filter(level => level.grade === grade);
}
