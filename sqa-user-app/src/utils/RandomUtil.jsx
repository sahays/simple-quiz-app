import cryptoRandomString from "crypto-random-string";

const getRandomNumbers = () => {
  return cryptoRandomString({ length: 7, type: "numeric" });
};

const getRandomAlphabets = () => {
  return cryptoRandomString({
    length: 5,
    characters: "abcdefghijklmnopqrstuvwxyz",
  });
};

const RandomUtil = () => {
  return { getRandomNumbers, getRandomAlphabets };
};

export default RandomUtil;
