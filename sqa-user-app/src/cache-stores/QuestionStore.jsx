import { StorageUtil } from "../utils/StorageUtil";
import { listQuestions } from "../graphql/queries";
import {
  createQuestion,
  deleteQuestion as deleteQ,
} from "../graphql/mutations";
import GraphQlUtil from "../utils/GraphQlUtil";

export const QuestionStore = () => {
  const { listAll, mutation } = GraphQlUtil();
  const key = "questions";
  const { readItem, deleteItem, createItem, hasItem } = StorageUtil();

  const getAllQuestions = async () => {
    // look for cache
    if (hasItem(key)) {
      console.log("cache hit");
      return readItem(key);
    } else {
      const {
        data: {
          listQuestions: { items },
        },
      } = await listAll(listQuestions);
      createItem(key, items);
      console.log("cache miss");
      return items;
    }
  };

  const createNewQuestion = async ({
    question,
    type,
    choices,
    answers,
    explanation,
    tags,
  }) => {
    // clear cache
    deleteItem(key);
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

  const invalidate = () => {
    console.log("invalidated");
    deleteItem(key);
    window.location.reload();
  };

  const deleteQuestion = async (questionId) => {
    try {
      const result = await mutation(deleteQ, {
        id: questionId,
      });
      deleteItem(key);
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getAllQuestions,
    createNewQuestion,
    invalidate,
    deleteQuestion,
  };
};
