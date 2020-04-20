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
      }
      description
      instructions
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
      }
      description
      instructions
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
      }
      description
      instructions
      owner
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      tags
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      tags
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      tags
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
      id
      sub
      username
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      sub
      username
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      sub
      username
      owner
    }
  }
`;
export const onCreateResponse = /* GraphQL */ `
  subscription OnCreateResponse($owner: String) {
    onCreateResponse(owner: $owner) {
      id
      username
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
      quizId
      responses {
        questionId
        responses
      }
      owner
    }
  }
`;
