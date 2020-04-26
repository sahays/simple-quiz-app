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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createQuizTag = /* GraphQL */ `
  mutation CreateQuizTag(
    $input: CreateQuizTagInput!
    $condition: ModelQuizTagConditionInput
  ) {
    createQuizTag(input: $input, condition: $condition) {
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
export const updateQuizTag = /* GraphQL */ `
  mutation UpdateQuizTag(
    $input: UpdateQuizTagInput!
    $condition: ModelQuizTagConditionInput
  ) {
    updateQuizTag(input: $input, condition: $condition) {
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
export const deleteQuizTag = /* GraphQL */ `
  mutation DeleteQuizTag(
    $input: DeleteQuizTagInput!
    $condition: ModelQuizTagConditionInput
  ) {
    deleteQuizTag(input: $input, condition: $condition) {
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
export const createQuestionTag = /* GraphQL */ `
  mutation CreateQuestionTag(
    $input: CreateQuestionTagInput!
    $condition: ModelQuestionTagConditionInput
  ) {
    createQuestionTag(input: $input, condition: $condition) {
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
export const updateQuestionTag = /* GraphQL */ `
  mutation UpdateQuestionTag(
    $input: UpdateQuestionTagInput!
    $condition: ModelQuestionTagConditionInput
  ) {
    updateQuestionTag(input: $input, condition: $condition) {
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
export const deleteQuestionTag = /* GraphQL */ `
  mutation DeleteQuestionTag(
    $input: DeleteQuestionTagInput!
    $condition: ModelQuestionTagConditionInput
  ) {
    deleteQuestionTag(input: $input, condition: $condition) {
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
export const createQuiz = /* GraphQL */ `
  mutation CreateQuiz(
    $input: CreateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    createQuiz(input: $input, condition: $condition) {
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
export const updateQuiz = /* GraphQL */ `
  mutation UpdateQuiz(
    $input: UpdateQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    updateQuiz(input: $input, condition: $condition) {
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
export const deleteQuiz = /* GraphQL */ `
  mutation DeleteQuiz(
    $input: DeleteQuizInput!
    $condition: ModelQuizConditionInput
  ) {
    deleteQuiz(input: $input, condition: $condition) {
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
export const createQuizQuestion = /* GraphQL */ `
  mutation CreateQuizQuestion(
    $input: CreateQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    createQuizQuestion(input: $input, condition: $condition) {
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
export const updateQuizQuestion = /* GraphQL */ `
  mutation UpdateQuizQuestion(
    $input: UpdateQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    updateQuizQuestion(input: $input, condition: $condition) {
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
export const deleteQuizQuestion = /* GraphQL */ `
  mutation DeleteQuizQuestion(
    $input: DeleteQuizQuestionInput!
    $condition: ModelQuizQuestionConditionInput
  ) {
    deleteQuizQuestion(input: $input, condition: $condition) {
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
