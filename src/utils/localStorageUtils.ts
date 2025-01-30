export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
};

export const setLocalStorageItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
