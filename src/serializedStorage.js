const serializedStorage = {
  STORAGE_KEY: "react_to_do_storage",

  fetch: function() {
    const strinifiedData = localStorage.getItem(serializedStorage.STORAGE_KEY);
    const data = JSON.parse(strinifiedData);
    return data || [];
  },

  save: function(data) {
    localStorage.setItem(serializedStorage.STORAGE_KEY, JSON.stringify(data));
  }
};

export default serializedStorage;
