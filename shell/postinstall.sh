if test -f ./src/manifest.json; then
  echo ./src/manifest.json 存在
else
  touch ./src/manifest.json
  echo "{}" >./src/manifest.json
fi
