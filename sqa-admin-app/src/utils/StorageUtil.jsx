export const StorageUtil = () => {
  const ns = "sqsnet-";
  const applyNs = (key) => {
    return ns + key;
  };
  const deleteItem = (key) => {
    key = applyNs(key);
    if (key in localStorage) localStorage.removeItem(key);
  };

  const readItem = (key) => {
    key = applyNs(key);
    if (key in localStorage) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };

  const createItem = (key, data) => {
    key = applyNs(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return {
    deleteItem,
    readItem,
    createItem,
  };
};
