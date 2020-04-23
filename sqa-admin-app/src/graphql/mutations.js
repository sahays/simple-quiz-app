/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
export const createQuiz = /* GraphQL */ `
  mutation CreateQuiz(
    $input: CreateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    createQuiz(input: $input, condition: $condition) {
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
      duration
      owner
    }
  }
`;
export const updateQuiz = /* GraphQL */ `
  mutation UpdateQuiz(
    $input: UpdateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    updateQuiz(input: $input, condition: $condition) {
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
      duration
      owner
    }
  }
`;
export const deleteQuiz = /* GraphQL */ `
  mutation DeleteQuiz(
    $input: DeleteQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    deleteQuiz(input: $input, condition: $condition) {
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
      duration
      owner
    }
  }
`;
export const createResponse = /* GraphQL */ `
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
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
export const updateResponse = /* GraphQL */ `
  mutation UpdateResponse(
    $input: UpdateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    updateResponse(input: $input, condition: $condition) {
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
export const deleteResponse = /* GraphQL */ `
  mutation DeleteResponse(
    $input: DeleteResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    deleteResponse(input: $input, condition: $condition) {
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
