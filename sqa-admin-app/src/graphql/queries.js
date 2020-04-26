/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      question
      type
      choices {
        id
        text
      }
      answers
      explanation
      tags {
        items {
          id
          tagId
          questionId
        }
        nextToken
      }
      quizzes {
        items {
          id
          questionId
          quizId
        }
        nextToken
      }
      owner
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        type
        choices {
          id
          text
        }
        answers
        explanation
        tags {
          nextToken
        }
        quizzes {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      text
      questions {
        items {
          id
          tagId
          questionId
        }
        nextToken
      }
      quizzes {
        items {
          id
          tagId
          quizId
        }
        nextToken
      }
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
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
      description
      instructions
      timeLimit
      tags {
        items {
          id
          tagId
          quizId
        }
        nextToken
      }
      questions {
        items {
          id
          questionId
          quizId
        }
        nextToken
      }
      owner
    }
  }
`;
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
        description
        instructions
        timeLimit
        tags {
          nextToken
        }
        questions {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getResponse = /* GraphQL */ `
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
      id
      username
      userAttrs {
        firstName
        lastName
      }
      quizId
      responses {
        questionId
        responses
      }
      owner
    }
  }
`;
export const listResponses = /* GraphQL */ `
  query ListResponses(
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        userAttrs {
          firstName
          lastName
        }
        quizId
        responses {
          questionId
          responses
        }
        owner
      }
      nextToken
    }
  }
`;
