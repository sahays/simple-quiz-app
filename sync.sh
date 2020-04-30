echo 'rsync -rv --delete sqa-admin-app/src/graphql/ sqa-user-app/src/graphql/' &&
rsync -rv --delete sqa-admin-app/src/graphql/ sqa-user-app/src/graphql/ &&
echo 'rsync -rv --delete sqa-admin-app/src/controls/ sqa-user-app/src/controls/' &&
rsync -rv --delete sqa-admin-app/src/controls/ sqa-user-app/src/controls/ &&
echo 'rsync -rv --delete sqa-admin-app/src/utils/ sqa-user-app/src/utils/' &&
rsync -rv --delete sqa-admin-app/src/utils/ sqa-user-app/src/utils/ &&
echo 'rsync -rv --delete sqa-admin-app/src/cache-stores/ sqa-user-app/src/cache-stores/' &&
rsync -rv --delete sqa-admin-app/src/cache-stores/ sqa-user-app/src/cache-stores/ &&
echo 'rsync -rv --delete sqa-admin-app/src/aws-exports.js sqa-user-app/src/aws-exports.js' && 
rsync -rv --delete sqa-admin-app/src/aws-exports.js sqa-user-app/src/aws-exports.js &&
echo 'rsync -rv --delete sqa-admin-app/src/App.css sqa-user-app/src/App.css' &&
rsync -rv --delete sqa-admin-app/src/App.css sqa-user-app/src/App.css