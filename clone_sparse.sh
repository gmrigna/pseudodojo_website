#!/usr/bin/env bash
set -euo pipefail
#set -x

TARGET_DIR="$1"
REPO="$2"
SUBDIR="$3"

# Ensure target directory exists
mkdir -p "$TARGET_DIR"

# Clone inside target directory
git clone --depth=1 --filter=blob:none --sparse "$REPO" "$TARGET_DIR/paw_jth_datasets"

cd "$TARGET_DIR/paw_jth_datasets"

git sparse-checkout set "$SUBDIR"

#git clone --depth=1 --filter=blob:none --sparse https://github.com/abinit/paw_jth_datasets.git
#cd paw_jth_datasets
#git sparse-checkout set pseudos/JTH-PBE-v2.0
