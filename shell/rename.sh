# pnpm build:app 之后会生成 unpackage/dist/build/app
# 我要把它改名为 unpackage/dist/build/unibest_app_build

# 只有存在新的 app 文件时，才执行这些操作！！否则会误删！！
if test -d ./dist/build/app; then
  echo '存在新打包出来的app - build'

  cd ./dist/build/

  # 1、删除旧的 rename 后的文件夹
  if test -d './unibest_app_build'; then
    rm -rf ./unibest_app_build
  fi

  # 2、把 app 命名为 unibest_app_build
  mv ./app ./unibest_app_build
fi

if test -d ./dist/dev/app; then
  echo '存在新打包出来的app - dev'

  cd ./dist/dev/

  # 1、删除旧的 rename 后的文件夹
  if test -d './unibest_app_dev'; then
    rm -rf ./unibest_app_dev
  fi

  # 2、把 app 命名为 unibest_app_build
  mv ./app ./unibest_app_dev
fi
