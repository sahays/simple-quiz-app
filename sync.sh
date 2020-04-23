rsync -rtvu --delete sqa-admin-app/src/graphql/ sqa-user-app/src/graphql/ &&
rsync -rtvu --delete sqa-admin-app/src/controls/ sqa-user-app/src/controls/ &&
rsync -rtvu --delete sqa-admin-app/src/utils/ sqa-user-app/src/utils/ &&
rsync -rtvu --delete sqa-admin-app/src/cache-stores/ sqa-user-app/src/cache-stores/ &&
rsync -rtvu --delete sqa-admin-app/src/aws-exports.js sqa-user-app/src/aws-exports.js