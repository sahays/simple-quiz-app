import { Predictions } from "aws-amplify";

export const detectEntities = async (sourceText) => {
  return await Predictions.interpret({
    text: {
      source: {
        text: sourceText,
      },
    },
    type: "Entity",
  });
};

export const detectSentiment = async (sourceText) => {
  return await Predictions.interpret({
    text: {
      source: {
        text: sourceText,
      },
    },
    type: "Sentiment",
  });
};

export const detectKeyPhrases = async (sourceText) => {
  return await Predictions.interpret({
    text: {
      source: {
        text: sourceText,
      },
    },
    type: "Keyphrase",
  });
};
