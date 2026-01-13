#!/bin/sh

# 清除 git add 添加的 svg 文件中所有节点的 style 属性
# 清除所有新增文件的 defs 标签及内部节点
# 针对 -filled 结尾的 svg 文件，清除 g 标签但保留内部节点

# 临时文件记录修改的文件
TEMP_FILE=$(mktemp)

# 获取暂存区中的 svg 文件
git diff --cached --name-only --diff-filter=AM | grep '\.svg$' | while read -r file; do
  # 检查文件是否存在
  if [ ! -f "$file" ]; then
    echo "警告: 文件 $file 不存在，跳过"
    continue
  fi
  
  modified=false
  
  # 使用 sed 删除所有 style 属性
  if grep -q ' style=' "$file"; then
    # 根据操作系统使用不同的 sed 命令
    if [ "$(uname)" = "Darwin" ]; then
      # macOS 使用 BSD sed
      sed -i '' 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
    else
      # Linux 使用 GNU sed
      sed -i 's/ style="[^"]*"//g; s/ style='\''[^'\'']*'\''//g' "$file"
    fi
    modified=true
    echo "清理 style 属性: $file"
  fi
  
  # 清除所有 defs 标签及其内部节点
  if grep -q '<defs[^>]*>' "$file"; then
    # 使用 sed 移除 defs 标签及其内部内容
    if [ "$(uname)" = "Darwin" ]; then
      # macOS 使用 BSD sed
      sed -i '' '/<defs[^>]*>/,/<\/defs>/d' "$file"
    else
      # Linux 使用 GNU sed
      sed -i '/<defs[^>]*>/,/<\/defs>/d' "$file"
    fi
    modified=true
    echo "清理 defs 标签: $file"
  fi
  
  # 检查是否是 -filled 结尾的文件
  if echo "$file" | grep -q '\-filled\.svg$'; then
    # 检查是否包含 g 标签
    if grep -q '<g[^>]*>' "$file"; then
      # 使用 sed 移除 g 标签但保留内部内容
      if [ "$(uname)" = "Darwin" ]; then
        # macOS 使用 BSD sed
        sed -i '' 's/<g[^>]*>//g; s/<\/g>//g' "$file"
      else
        # Linux 使用 GNU sed
        sed -i 's/<g[^>]*>//g; s/<\/g>//g' "$file"
      fi
      modified=true
      echo "清理 g 标签: $file"
    fi
  fi
  
  # 如果文件被修改，记录到临时文件
  if [ "$modified" = true ]; then
    echo "$file" >> "$TEMP_FILE"
  fi
done

# 将所有修改的文件重新添加到暂存区
if [ -s "$TEMP_FILE" ]; then
  count=$(wc -l < "$TEMP_FILE")
  xargs git add < "$TEMP_FILE"
  echo "✓ 已处理 $count 个暂存区 SVG 文件并重新添加到暂存区"
else
  echo "✓ 暂存区中没有需要处理的 SVG 文件"
fi

# 清理临时文件
rm -f "$TEMP_FILE"
