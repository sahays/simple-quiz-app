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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateQuizTag = /* GraphQL */ `
  subscription OnCreateQuizTag {
    onCreateQuizTag {
      id
      tagId
      quizId
      tag {
        id
        text
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      quiz {
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
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      quiz {
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
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      quiz {
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
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      question {
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
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      question {
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
        questions {
          nextToken
        }
        quizzes {
          nextToken
        }
      }
      question {
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
        tags {
          nextToken
        }
        questions {
          nextToken
        }
        owner
      }
      question {
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
        tags {
          nextToken
        }
        questions {
          nextToken
        }
        owner
      }
      question {
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
        tags {
          nextToken
        }
        questions {
          nextToken
        }
        owner
      }
      question {
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
