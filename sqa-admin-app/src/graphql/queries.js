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
      tags
      explanation
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
        tags
        explanation
        owner
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
        answers
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
          answers
          tags
          explanation
        }
        description
        instructions
        timeLimit
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
