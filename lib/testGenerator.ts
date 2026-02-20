// 测试题目生成
import { generateQuestionsForLevel } from './questionGenerator';
import { Grade, Difficulty } from './types';

// 测试一年级第一关
console.log('=== 测试一年级第一关：快乐的加法 ===');
const questions1 = generateQuestionsForLevel(Grade.Grade1, Difficulty.Basic, 1, 'grade1-basic-1');
questions1.forEach((q, i) => {
  console.log(`题目 ${i + 1}: ${q.question}`);
  console.log(`选项: ${q.options.join(', ')}`);
  console.log(`答案: ${q.answer}`);
  console.log(`答案在选项中: ${q.options.includes(q.answer) ? '✅' : '❌'}`);
  console.log('---');
});

// 测试一年级第二关
console.log('\n=== 测试一年级第二关：减法小能手 ===');
const questions2 = generateQuestionsForLevel(Grade.Grade1, Difficulty.Basic, 2, 'grade1-basic-2');
questions2.forEach((q, i) => {
  console.log(`题目 ${i + 1}: ${q.question}`);
  console.log(`选项: ${q.options.join(', ')}`);
  console.log(`答案: ${q.answer}`);
  console.log(`答案在选项中: ${q.options.includes(q.answer) ? '✅' : '❌'}`);
  console.log('---');
});

// 验证题目不重复
const allQ1 = questions1.map(q => q.question);
const allQ2 = questions2.map(q => q.question);
const duplicates = allQ1.filter(q => allQ2.includes(q));
console.log(`\n重复题目数量: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log('重复的题目:', duplicates);
}
