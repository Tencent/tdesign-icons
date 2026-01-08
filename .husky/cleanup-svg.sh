#!/bin/bash

# 清除 svg 目录下所有 svg 文件中所有节点的 style 属性

SVG_DIR="svg"

# 检查目录是否存在
if [ ! -d "$SVG_DIR" ]; then
  echo "错误: $SVG_DIR 目录不存在"
  exit 1
fi

# 统计处理的文件数
count=0

# 遍历所有 svg 文件
find "$SVG_DIR" -type f -name "*.svg" -print0 | while IFS= read -r -d '' file; do
  # 保存修改前的内容哈希
  if [[ "$OSTYPE" == "darwin"* ]]; then
    before=$(md5 -q "$file" 2>/dev/null)
  else
    before=$(md5sum "$file" 2>/dev/null | cut -d' ' -f1)
  fi
  
  # 使用 sed 删除所有 style 属性
  # 匹配 style="..." 或 style='...'，支持多行
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS 使用 BSD sed
    sed -i '' 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
  else
    # Linux 使用 GNU sed
    sed -i 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
  fi
  
  # 检查文件是否被修改
  if [[ "$OSTYPE" == "darwin"* ]]; then
    after=$(md5 -q "$file" 2>/dev/null)
  else
    after=$(md5sum "$file" 2>/dev/null | cut -d' ' -f1)
  fi
  
  if [ "$before" != "$after" ]; then
    # 将修改后的文件添加到暂存区
    git add "$file"
    count=$((count + 1))
    echo "清理: $file"
  fi
done

if [ $count -gt 0 ]; then
  echo "✓ 已清理 $count 个 SVG 文件的 style 属性并添加到暂存区"
else
  echo "✓ 没有需要清理的 SVG 文件"
fi
