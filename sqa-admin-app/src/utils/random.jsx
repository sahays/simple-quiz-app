import cryptoRandomString from "crypto-random-string";

const defaultRandomNumbers = () => {
  return cryptoRandomString({ length: 7, type: "numeric" });
};

const defaultRandomAlpha = () => {
  return cryptoRandomString({ length: 5 });
};

const random = () => {
  return { defaultRandomNumbers, defaultRandomAlpha };
};

export default random;
