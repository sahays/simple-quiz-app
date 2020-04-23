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
      }
      nextToken
    }
  }
`;

export const getQuiz = /* GraphQL */ `
  query GetQuiz($id: ID!) {
    getQuiz(id: $id) {
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
        explanation
      }
      description
      instructions
      timeLimit
      owner
    }
  }
`;
