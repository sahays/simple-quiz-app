const StringUtil = () => {
  const trimSplit = (text) => {
    return text.split(",").map((x) => {
      return x.trim();
    });
  };

  return { trimSplit };
};

export default StringUtil;
