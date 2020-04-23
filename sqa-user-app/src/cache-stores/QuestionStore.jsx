import { StorageUtil } from "../utils/StorageUtil";
import { listQuestions } from "../graphql/queries";
import { createQuestion } from "../graphql/mutations";
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
    tags,
  }) => {
    // clear cache
    invalidate();
    // insert
    try {
      await mutation(createQuestion, {
        question,
        type,
        choices,
        answers,
        tags,
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

  return {
    getAllQuestions,
    createNewQuestion,
    invalidate,
  };
};
