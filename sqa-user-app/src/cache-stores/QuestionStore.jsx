import { listQuestions } from "../graphql/queries";
import {
  createQuestion,
  deleteQuestion as deleteQ,
} from "../graphql/mutations";
import GraphQlUtil from "../utils/GraphQlUtil";

export const QuestionStore = () => {
  const { listAll, mutation } = GraphQlUtil();

  const getAllQuestions = async () => {
    const {
      data: {
        listQuestions: { items },
      },
    } = await listAll(listQuestions);
    console.log("cache miss");
    return items;
  };

  const createNewQuestion = async ({
    question,
    type,
    choices,
    answers,
    explanation,
    tags,
  }) => {
    // insert
    try {
      await mutation(createQuestion, {
        question,
        type,
        choices,
        answers,
        tags,
        explanation,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQuestion = async (questionId) => {
    try {
      const result = await mutation(deleteQ, {
        id: questionId,
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getAllQuestions,
    createNewQuestion,
    deleteQuestion,
  };
};
