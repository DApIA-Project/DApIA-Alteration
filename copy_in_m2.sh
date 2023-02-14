#!/bin/bash
m2_dir="$HOME/.m2/repository/com/fdit"
if [ ! -d "$m2_dir" ]; then
    echo "Creating directory $m2_dir"
    mkdir -p "$m2_dir"
fi
echo "Copy directory $m2_dir ..."
cp -r packages/alteration/libs/com/fdit/tools "$m2_dir"
