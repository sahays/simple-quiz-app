export const StorageUtil = () => {
  const ns = "sqsnet-";
  const applyNs = (key) => {
    return ns + key;
  };
  const deleteItem = (key) => {
    key = applyNs(key);
    if (hasItem(key)) localStorage.removeItem(key);
  };

  const readItem = (key) => {
    key = applyNs(key);
    if (hasItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return null;
  };

  const createItem = (key, data) => {
    key = applyNs(key);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const hasItem = (key) => {
    if (!key.startsWith(ns)) key = applyNs(key);
    return key in localStorage;
  };

  return {
    deleteItem,
    readItem,
    createItem,
    hasItem,
  };
};
