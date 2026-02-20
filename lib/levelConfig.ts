import { Grade, Difficulty } from '@/types';

// 每个年级每关的题目数量配置
export const QUESTIONS_PER_LEVEL = {
  [Grade.Grade1]: 6,   // 一年级：6题/关
  [Grade.Grade2]: 7,   // 二年级：7题/关
  [Grade.Grade3]: 8,   // 三年级：8题/关
  [Grade.Grade4]: 9,   // 四年级：9题/关
  [Grade.Grade5]: 10,  // 五年级：10题/关
  [Grade.Grade6]: 11,  // 六年级：11题/关
};

// 每个年级每个难度的关卡数量
export const LEVELS_PER_GRADE = {
  [Grade.Grade1]: { basic: 3, advanced: 3, olympiad: 3 },  // 只实现3关
  [Grade.Grade2]: { basic: 3, advanced: 3, olympiad: 3 },
  [Grade.Grade3]: { basic: 3, advanced: 3, olympiad: 3 },
  [Grade.Grade4]: { basic: 3, advanced: 3, olympiad: 3 },
  [Grade.Grade5]: { basic: 3, advanced: 3, olympiad: 3 },
  [Grade.Grade6]: { basic: 3, advanced: 3, olympiad: 3 },
};

// 时间限制（秒）= 每题30秒 * 题目数量
export function getTimeLimit(grade: Grade): number {
  const questionsPerLevel = QUESTIONS_PER_LEVEL[grade];
  return questionsPerLevel * 30;
}

// 获取关卡题目数量
export function getQuestionsCount(grade: Grade): number {
  return QUESTIONS_PER_LEVEL[grade];
}

// 生成关卡ID
export function generateLevelId(grade: Grade, difficulty: Difficulty, levelNumber: number): string {
  const gradeStr = grade.toString().padStart(2, '0');
  const diffMap = { basic: 'B', advanced: 'A', olympiad: 'O' };
  const diffStr = diffMap[difficulty];
  const levelStr = levelNumber.toString().padStart(2, '0');
  return `G${gradeStr}_${diffStr}_L${levelStr}`;
}
