export const listQuizs = /* GraphQL */ `
  query ListQuizs(
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuizs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        name
        tags
        questions {
          id
          question
          type
          choices {
            id
            text
          }
          tags
        }
        description
        instructions
        owner
      }
      nextToken
    }
  }
`;
