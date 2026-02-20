#!/bin/bash

# Math Game v1.0 版本归档脚本
# 用途：将当前项目标记为v1.0版本并创建归档

set -e  # 遇到错误立即退出

echo "========================================="
echo "  Math Game v1.0 版本归档脚本"
echo "========================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在git仓库中
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}警告：当前目录不是git仓库${NC}"
    echo "建议先初始化git仓库："
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit: Math Game v1.0'"
    echo ""
    read -p "是否继续归档（不使用git）？(y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 1. 创建版本目录
echo -e "${BLUE}[1/6] 创建版本归档目录...${NC}"
VERSION_DIR="archive/v1.0"
mkdir -p "$VERSION_DIR"
echo -e "${GREEN}✓ 创建目录: $VERSION_DIR${NC}"
echo ""

# 2. 生成版本快照
echo -e "${BLUE}[2/6] 生成版本快照...${NC}"
SNAPSHOT_FILE="$VERSION_DIR/v1.0-snapshot.txt"

cat > "$SNAPSHOT_FILE" << EOF
Math Game v1.0 版本快照
=====================================

生成时间: $(date '+%Y-%m-%d %H:%M:%S')
版本号: 1.0.0
状态: Production Ready

项目文件统计
-------------------------------------
EOF

# 统计文件数量
echo "总文件数: $(find . -type f -not -path './node_modules/*' -not -path './.next/*' -not -path './.git/*' | wc -l)" >> "$SNAPSHOT_FILE"
echo "TypeScript文件: $(find . -name '*.ts' -o -name '*.tsx' | wc -l)" >> "$SNAPSHOT_FILE"
echo "React组件: $(find ./components -name '*.tsx' 2>/dev/null | wc -l)" >> "$SNAPSHOT_FILE"
echo "题库文件: $(find ./public/questions -name '*.json' 2>/dev/null | wc -l)" >> "$SNAPSHOT_FILE"
echo "" >> "$SNAPSHOT_FILE"

# 添加package.json信息
echo "依赖包信息:" >> "$SNAPSHOT_FILE"
cat package.json | grep -A 20 '"dependencies"' >> "$SNAPSHOT_FILE"

echo -e "${GREEN}✓ 快照已保存: $SNAPSHOT_FILE${NC}"
echo ""

# 3. 复制关键文档到归档目录
echo -e "${BLUE}[3/6] 复制文档到归档目录...${NC}"
cp CHANGELOG.md "$VERSION_DIR/"
cp README_v1.0.md "$VERSION_DIR/"
cp PROJECT_STATUS.md "$VERSION_DIR/"
cp VERSION_1.0_RELEASE_NOTES.md "$VERSION_DIR/"
cp package.json "$VERSION_DIR/"
echo -e "${GREEN}✓ 文档已复制${NC}"
echo ""

# 4. 生成当前文件清单
echo -e "${BLUE}[4/6] 生成文件清单...${NC}"
FILE_LIST="$VERSION_DIR/file-list.txt"

find . -type f \
  -not -path './node_modules/*' \
  -not -path './.next/*' \
  -not -path './.git/*' \
  -not -path './archive/*' \
  | sort > "$FILE_LIST"

echo -e "${GREEN}✓ 文件清单已生成: $FILE_LIST${NC}"
echo "  总文件数: $(cat "$FILE_LIST" | wc -l)"
echo ""

# 5. 创建版本标记文件
echo -e "${BLUE}[5/6] 创建版本标记...${NC}"
cat > "$VERSION_DIR/VERSION_INFO.md" << EOF
# Math Game v1.0 版本信息

## 版本详情
- **版本号**: 1.0.0
- **发布日期**: 2026-02-21
- **状态**: Production Ready (生产就绪)
- **代码分支**: main

## 核心特性
- 54个精心设计的关卡
- 5157+道真实题目
- 智能题库系统
- 完整的成就系统
- 响应式设计

## 技术栈
- Next.js 14.2
- React 18.3
- TypeScript 5.6
- Tailwind CSS 3.4
- Zustand 5.0
- Framer Motion 11.11

## 归档内容
- CHANGELOG.md - 版本变更记录
- README_v1.0.md - 完整使用指南
- PROJECT_STATUS.md - 项目状态文档
- VERSION_1.0_RELEASE_NOTES.md - 发布说明
- package.json - 依赖信息
- v1.0-snapshot.txt - 版本快照
- file-list.txt - 文件清单

## 后续版本
- v2.0 计划：徽章系统UI、用户系统、后端API

## 维护者
开发团队

## 联系方式
- 邮箱: support@example.com
- GitHub: [项目地址]
EOF

echo -e "${GREEN}✓ 版本标记已创建${NC}"
echo ""

# 6. Git标记（如果是git仓库）
if [ -d ".git" ]; then
    echo -e "${BLUE}[6/6] 创建Git标签...${NC}"

    # 检查标签是否已存在
    if git rev-parse v1.0.0 >/dev/null 2>&1; then
        echo -e "${YELLOW}标签 v1.0.0 已存在，跳过创建${NC}"
    else
        read -p "是否创建Git标签 v1.0.0？(y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git tag -a v1.0.0 -m "Release v1.0.0: Initial stable release"

            echo -e "${GREEN}✓ Git标签 v1.0.0 已创建${NC}"
            echo ""
            echo "提示：推送标签到远程仓库"
            echo "  git push origin v1.0.0"
        fi
    fi
else
    echo -e "${BLUE}[6/6] Git仓库检测${NC}"
    echo -e "${YELLOW}跳过（非git仓库）${NC}"
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  v1.0 归档完成！${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "归档位置: $VERSION_DIR/"
echo ""
echo "包含文件:"
ls -lh "$VERSION_DIR" | tail -n +2 | awk '{print "  - " $9 " (" $5 ")"}'
echo ""
echo -e "${BLUE}下一步：${NC}"
echo "  1. 查看归档内容: cd $VERSION_DIR"
echo "  2. 阅读发布说明: cat VERSION_1.0_RELEASE_NOTES.md"
echo "  3. 开始2.0开发: 创建新分支 'feature/2.0'"
echo ""
echo -e "${GREEN}祝开发顺利！${NC}"
