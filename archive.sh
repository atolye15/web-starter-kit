#!/bin/sh

spinner(){
  local pid=$!
  local delay=0.75
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
      local temp=${spinstr#?}
      printf " [%c]  " "$spinstr"
      local spinstr=$temp${spinstr%"$temp"}
      sleep $delay
      printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}


read -p "Do you want to upgrade the version? (y/n) " -n 1 -r
echo    # (optional) move to a new line

bumpVersion=false

if [[ $REPLY =~ ^[Yy]$ ]]
  then
  bumpVersion=true
  echo "[OK] Patched the version"
  gulp bump > /dev/null
fi

VERSION_NUMBER=$(node -e 'console.log(require("./configs.js").info.version)')
VERSION=v$VERSION_NUMBER
PROJECT_NAME=$(node -e 'console.log(require("./configs.js").info.name)')
FOLDER_NAME=$PROJECT_NAME-$VERSION

if $bumpVersion
  then
  git add configs.js
  git commit -m "Version upgraded to $VERSION"
  git tag -a $VERSION -m "Version $VERSION_NUMBER"
fi

gulp build > /dev/null & spinner
echo "[OK] Building completed in development environment"

gulp build --prod > /dev/null & spinner
echo "[OK] Building completed in production environment"

gulp styleguide > /dev/null & spinner
echo "[OK] Building styleguide completed"

mkdir -p ~/Desktop/$FOLDER_NAME
mkdir -p ~/Desktop/$FOLDER_NAME/dist
mkdir -p ~/Desktop/$FOLDER_NAME/dev
mkdir -p ~/Desktop/$FOLDER_NAME/styleguide
mkdir -p ~/Desktop/$FOLDER_NAME/source

cp -R ./dist ~/Desktop/$FOLDER_NAME/
cp -R ./dev ~/Desktop/$FOLDER_NAME/
cp -R ./styleguide ~/Desktop/$FOLDER_NAME/
echo "[OK] Folders copied"

git archive HEAD | tar -x -C ~/Desktop/$FOLDER_NAME/source
echo "[OK] Source code archived"

zip -r ~/Desktop/$FOLDER_NAME.zip ~/Desktop/$FOLDER_NAME > /dev/null & spinner
echo "[OK] Archiving completed"
