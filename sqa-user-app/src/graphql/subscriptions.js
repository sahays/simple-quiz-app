/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($owner: String) {
    onCreateQuestion(owner: $owner) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($owner: String!) {
    onDeleteQuestion(owner: $owner) {
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
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($owner: String) {
    onCreateQuiz(owner: $owner) {
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
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz {
    onUpdateQuiz {
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
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($owner: String!) {
    onDeleteQuiz(owner: $owner) {
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
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse($owner: String) {
    onCreateResponse(owner: $owner) {
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
export const onUpdateResponse = /* GraphQL */ `
  subscription OnUpdateResponse {
    onUpdateResponse {
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
export const onDeleteResponse = /* GraphQL */ `
  subscription OnDeleteResponse {
    onDeleteResponse {
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
