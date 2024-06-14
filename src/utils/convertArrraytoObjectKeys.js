const convertArrayToObjectKeys = (data) => {
  let hashTable = {};
  if (data) {
    for (let i = 0; i < data.length; i++) {
      const { label } = data[i];
      hashTable[data[i].value] = label;
    }
  }
  return hashTable;
};

export { convertArrayToObjectKeys };
