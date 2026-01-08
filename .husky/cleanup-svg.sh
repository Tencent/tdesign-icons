#!/bin/sh

# 清除 svg 目录下所有 svg 文件中所有节点的 style 属性

SVG_DIR="svg"

# 检查目录是否存在
if [ ! -d "$SVG_DIR" ]; then
  echo "错误: $SVG_DIR 目录不存在"
  exit 1
fi

# 临时文件记录修改的文件
TEMP_FILE=$(mktemp)

# 遍历所有 svg 文件
find "$SVG_DIR" -type f -name "*.svg" | while read -r file; do
  # 使用 sed 删除所有 style 属性，并检查是否有修改
  if grep -q ' style=' "$file"; then
    # 根据操作系统使用不同的 sed 命令
    if [ "$(uname)" = "Darwin" ]; then
      # macOS 使用 BSD sed
      sed -i '' 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
    else
      # Linux 使用 GNU sed
      sed -i 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
    fi
    
    # 记录修改的文件
    echo "$file" >> "$TEMP_FILE"
    echo "清理: $file"
  fi
done

# 将所有修改的文件添加到暂存区
if [ -s "$TEMP_FILE" ]; then
  count=$(wc -l < "$TEMP_FILE")
  xargs git add < "$TEMP_FILE"
  echo "✓ 已清理 $count 个 SVG 文件的 style 属性并添加到暂存区"
else
  echo "✓ 没有需要清理的 SVG 文件"
fi

# 清理临时文件
rm -f "$TEMP_FILE"
