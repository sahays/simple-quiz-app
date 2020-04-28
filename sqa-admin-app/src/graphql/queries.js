/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchGetQuestions = /* GraphQL */ `
  query BatchGetQuestions($ids: [String]) {
    batchGetQuestions(ids: $ids) {
      id
      question
      type
      choices {
        id
        text
      }
      answers
      points
      explanation
      dateCreated
    }
  }
`;
export const batchGetResponses = /* GraphQL */ `
  query BatchGetResponses($ids: [String]) {
    batchGetResponses(ids: $ids) {
      id
      username
      userAttrs {
        firstName
        lastName
      }
      quizId
      quizCode
      responses {
        questionId
        responses
      }
      dateCreated
    }
  }
`;
export const batchGetQuizzes = /* GraphQL */ `
  query BatchGetQuizzes($ids: [String]) {
    batchGetQuizzes(ids: $ids) {
      id
      code
      name
      description
      instructions
      timeLimit
      dateCreated
      questions
    }
  }
`;
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
      points
      explanation
      dateCreated
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
        answers
        points
        explanation
        dateCreated
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
      dateCreated
      questions
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
        dateCreated
        questions
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
      quizCode
      responses {
        questionId
        responses
      }
      dateCreated
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
        quizId
        quizCode
        dateCreated
      }
      nextToken
    }
  }
`;
export const userResponsesByQuizCode = /* GraphQL */ `
  query UserResponsesByQuizCode(
    $quizCode: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userResponsesByQuizCode(
      quizCode: $quizCode
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        quizId
        quizCode
        dateCreated
      }
      nextToken
    }
  }
`;
