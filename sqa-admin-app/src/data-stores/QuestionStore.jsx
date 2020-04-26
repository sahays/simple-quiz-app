import GraphQlUtil from "../utils/GraphQlUtil";
const { mutation, filter } = GraphQlUtil();
import { createQuestion } from "../graphql/mutations";
import { listQuestions, getQuestion } from "../graphql/queries";
import { Logger } from "aws-amplify";
const logger = new Logger("QuestionStore");

const QuestionStore = () => {
  const addNewQuestion = async ({
    question,
    choices,
    answers,
    explanation,
    questionType,
    tags,
  }) => {
    try {
      const result = await mutation(createQuestion, {
        question,
        choices,
        answers,
        explanation,
        questionType,
        tags,
      });
      return result;
    } catch (e) {
      logger.error(`failed to create question because of ${e}`);
    }
  };

  const listQuestionsByTag = async (tagId) => {
    try {
      const result = await filter(listQuestions, {
        tags: { contains: tagId },
      });
      return result;
    } catch (e) {
      logger.error(`failed to list questions by ${tagId} because of ${e}`);
    }
  };

  const getQuestionById = async (id) => {
    try {
      const result = await query(getQuestion, {
        id: id,
      });
      return result;
    } catch (e) {
      logger.error(`failed to get question by ${id} because of ${e}`);
    }
  };

  return {
    addNewQuestion,
    listQuestionsByTag,
    getQuestionById,
  };
};

export default QuestionStore;
