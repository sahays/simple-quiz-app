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
        timeTaken
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
          timeTaken
          responses
        }
        owner
      }
      nextToken
    }
  }
`;
export const getQuizByCode = /* GraphQL */ `
  query GetQuizByCode(
    $code: String
    $sortDirection: ModelSortDirection
    $filter: ModelQuizFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getQuizByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const listUserResponsesByQuiz = /* GraphQL */ `
  query ListUserResponsesByQuiz(
    $quizId: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserResponsesByQuiz(
      quizId: $quizId
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          timeTaken
          responses
        }
        owner
      }
      nextToken
    }
  }
`;
