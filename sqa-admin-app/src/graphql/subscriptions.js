/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
      id
      text
      type
      questions {
        nextToken
      }
      quizzes {
        nextToken
      }
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
      id
      text
      type
      questions {
        nextToken
      }
      quizzes {
        nextToken
      }
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
      id
      text
      type
      questions {
        nextToken
      }
      quizzes {
        nextToken
      }
    }
  }
`;
export const onCreateQuizTag = /* GraphQL */ `
  subscription OnCreateQuizTag {
    onCreateQuizTag {
      id
      tagId
      quizId
      tag {
        id
        text
        type
      }
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
    }
  }
`;
export const onUpdateQuizTag = /* GraphQL */ `
  subscription OnUpdateQuizTag {
    onUpdateQuizTag {
      id
      tagId
      quizId
      tag {
        id
        text
        type
      }
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
    }
  }
`;
export const onDeleteQuizTag = /* GraphQL */ `
  subscription OnDeleteQuizTag {
    onDeleteQuizTag {
      id
      tagId
      quizId
      tag {
        id
        text
        type
      }
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
    }
  }
`;
export const onCreateQuestionTag = /* GraphQL */ `
  subscription OnCreateQuestionTag {
    onCreateQuestionTag {
      id
      tagId
      questionId
      tag {
        id
        text
        type
      }
      question {
        id
        question
        type
        answers
        explanation
      }
    }
  }
`;
export const onUpdateQuestionTag = /* GraphQL */ `
  subscription OnUpdateQuestionTag {
    onUpdateQuestionTag {
      id
      tagId
      questionId
      tag {
        id
        text
        type
      }
      question {
        id
        question
        type
        answers
        explanation
      }
    }
  }
`;
export const onDeleteQuestionTag = /* GraphQL */ `
  subscription OnDeleteQuestionTag {
    onDeleteQuestionTag {
      id
      tagId
      questionId
      tag {
        id
        text
        type
      }
      question {
        id
        question
        type
        answers
        explanation
      }
    }
  }
`;
export const onCreateQuiz = /* GraphQL */ `
  subscription OnCreateQuiz($owner: String) {
    onCreateQuiz(owner: $owner) {
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
  }
`;
export const onUpdateQuiz = /* GraphQL */ `
  subscription OnUpdateQuiz {
    onUpdateQuiz {
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
  }
`;
export const onDeleteQuiz = /* GraphQL */ `
  subscription OnDeleteQuiz($owner: String!) {
    onDeleteQuiz(owner: $owner) {
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
  }
`;
export const onCreateQuizQuestion = /* GraphQL */ `
  subscription OnCreateQuizQuestion {
    onCreateQuizQuestion {
      id
      questionId
      quizId
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
      question {
        id
        question
        type
        answers
        explanation
      }
    }
  }
`;
export const onUpdateQuizQuestion = /* GraphQL */ `
  subscription OnUpdateQuizQuestion {
    onUpdateQuizQuestion {
      id
      questionId
      quizId
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
      question {
        id
        question
        type
        answers
        explanation
      }
    }
  }
`;
export const onDeleteQuizQuestion = /* GraphQL */ `
  subscription OnDeleteQuizQuestion {
    onDeleteQuizQuestion {
      id
      questionId
      quizId
      quiz {
        id
        code
        name
        description
        instructions
        timeLimit
        owner
      }
      question {
        id
        question
        type
        answers
        explanation
      }
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
