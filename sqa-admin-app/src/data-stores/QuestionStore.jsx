import GraphQlUtil from "../utils/GraphQlUtil";
import { createQuestion } from "../graphql/mutations";
import { getQuestion } from "../graphql/queries";
import { Logger } from "aws-amplify";

const QuestionStore = () => {
  const { mutation, filter, query } = GraphQlUtil();
  const logger = new Logger("QuestionStore");
  const addNewQuestion = async ({
    question,
    choices,
    answers,
    explanation,
    type,
  }) => {
    try {
      const result = await mutation(createQuestion, {
        question,
        choices,
        answers,
        explanation,
        type,
        dateCreated: Date.now(),
      });
      logger.debug(result);
      return result;
    } catch (e) {
      logger.error(e);
      throw e;
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

  const searchQuestions = async (text) => {
    try {
      const result = await filter(searchQuestions, {
        question: { match: text },
      });
      return result;
    } catch (e) {
      logger.error(`failed to get question by ${text} because of ${e}`);
    }
  };

  return {
    addNewQuestion,
    searchQuestions,
    getQuestionById,
  };
};

export default QuestionStore;
