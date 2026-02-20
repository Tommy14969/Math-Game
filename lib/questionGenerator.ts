import { Grade, Difficulty, Question, QuestionType } from '@/types';
import { shuffleArray } from './data';

// 全局题目池，确保不重复
const questionPool = new Set<string>();

// 根据关卡ID生成不同的题目
export function generateQuestionsForLevel(
  grade: Grade,
  difficulty: Difficulty,
  levelNumber: number,
  levelId: string
): Question[] {
  const questionsCount = getQuestionsCount(grade);
  const questions: Question[] = [];

  // 清空题目池（每次重新进入游戏时）
  if (levelNumber === 1) {
    questionPool.clear();
  }

  // 根据关卡号决定题目类型
  if (levelNumber === 1) {
    // 第一关：快乐的加法 - 纯加法
    for (let i = 0; i < questionsCount; i++) {
      const q = generateUniqueAddition(grade, levelNumber, i, true);
      questions.push(q);
    }
  } else if (levelNumber === 2) {
    // 第二关：减法小能手 - 纯减法
    for (let i = 0; i < questionsCount; i++) {
      const q = generateUniqueSubtraction(grade, levelNumber, i, true);
      questions.push(q);
    }
  } else if (levelNumber === 3) {
    // 第三关：加减大挑战 - 混合
    for (let i = 0; i < questionsCount; i++) {
      if (i % 2 === 0) {
        const q = generateUniqueAddition(grade, levelNumber, i, false);
        questions.push(q);
      } else {
        const q = generateUniqueSubtraction(grade, levelNumber, i, false);
        questions.push(q);
      }
    }
  }

  return questions;
}

// 生成唯一的加法题目
function generateUniqueAddition(
  grade: Grade,
  levelNumber: number,
  index: number,
  isSimple: boolean
): Question {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const maxSum = isSimple ? 10 : 20;
    const minAddend = 1;

    // 生成随机加数
    const a = Math.floor(Math.random() * (maxSum / 2 - minAddend)) + minAddend;
    const b = Math.floor(Math.random() * (maxSum - a - minAddend)) + minAddend;
    const answer = a + b;

    // 生成题目ID
    const questionId = `${a}+${b}`;

    // 检查是否已存在
    if (!questionPool.has(questionId)) {
      questionPool.add(questionId);

      // 生成选项
      const options = generateCorrectOptions(answer);

      return {
        id: `add_${levelNumber}_${index}_${Date.now()}`,
        grade,
        difficulty: 'basic' as any,
        type: QuestionType.Addition,
        question: `${a} + ${b} = ?`,
        options,
        answer,
        points: 10,
        timeLimit: 30,
        hint: `${a}加${b}，从${a}开始往上数${b}个`,
        explanation: `${a} + ${b} = ${answer}`,
      };
    }

    attempts++;
  }

  // 如果实在找不到，返回一个简单的默认题目
  const a = 1, b = 1;
  const answer = a + b;
  return {
    id: `add_default_${Date.now()}`,
    grade,
    difficulty: 'basic' as any,
    type: QuestionType.Addition,
    question: `${a} + ${b} = ?`,
    options: generateCorrectOptions(answer),
    answer,
    points: 10,
    timeLimit: 30,
    hint: `${a}加${b}等于${answer}`,
    explanation: `${a} + ${b} = ${answer}`,
  };
}

// 生成唯一的减法题目
function generateUniqueSubtraction(
  grade: Grade,
  levelNumber: number,
  index: number,
  isSimple: boolean
): Question {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const maxMinuend = isSimple ? 10 : 20;

    // 生成随机减数
    const a = Math.floor(Math.random() * (maxMinuend - 5)) + 5;
    const b = Math.floor(Math.random() * (a - 1)) + 1;
    const answer = a - b;

    // 生成题目ID
    const questionId = `${a}-${b}`;

    // 检查是否已存在
    if (!questionPool.has(questionId)) {
      questionPool.add(questionId);

      // 生成选项
      const options = generateCorrectOptions(answer);

      return {
        id: `sub_${levelNumber}_${index}_${Date.now()}`,
        grade,
        difficulty: 'basic' as any,
        type: QuestionType.Subtraction,
        question: `${a} - ${b} = ?`,
        options,
        answer,
        points: 10,
        timeLimit: 30,
        hint: `${a}减${b}，从${a}开始往下数${b}个`,
        explanation: `${a} - ${b} = ${answer}`,
      };
    }

    attempts++;
  }

  // 如果实在找不到，返回一个简单的默认题目
  const a = 5, b = 1;
  const answer = a - b;
  return {
    id: `sub_default_${Date.now()}`,
    grade,
    difficulty: 'basic' as any,
    type: QuestionType.Subtraction,
    question: `${a} - ${b} = ?`,
    options: generateCorrectOptions(answer),
    answer,
    points: 10,
    timeLimit: 30,
    hint: `${a}减${b}等于${answer}`,
    explanation: `${a} - ${b} = ${answer}`,
  };
}

// 生成正确的选项
function generateCorrectOptions(correctAnswer: number): number[] {
  const options = new Set<number>();
  options.add(correctAnswer);

  // 生成3个不同的错误选项
  while (options.size < 4) {
    let wrongAnswer: number;

    // 随机选择一个偏移量
    const offset = Math.floor(Math.random() * 5) + 1;
    const direction = Math.random() > 0.5 ? 1 : -1;

    wrongAnswer = correctAnswer + (offset * direction);

    // 确保选项在合理范围内
    if (wrongAnswer >= 0 && wrongAnswer <= 20 && wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer);
    }
  }

  // 打乱选项顺序
  return shuffleArray(Array.from(options));
}

// 获取每个年级每关的题目数量
function getQuestionsCount(grade: Grade): number {
  const counts = {
    [Grade.Grade1]: 6,
    [Grade.Grade2]: 7,
    [Grade.Grade3]: 8,
    [Grade.Grade4]: 9,
    [Grade.Grade5]: 10,
    [Grade.Grade6]: 11,
  };
  return counts[grade] || 6;
}
