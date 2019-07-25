const insertNodes = (arrayNodes, firstElem, lastElem) => {
  const parentNode = firstElem.parentNode;
  let del = false;
  let index = 0;

  while (parentNode.childNodes[index] !== lastElem) {
    if (del === true) {
      parentNode.childNodes[index].remove();
      index -= 1;
    }
    if (parentNode.childNodes[index] === firstElem) {
      del = true;
    }
    index += 1;
  }
  arrayNodes.forEach(element => {
    parentNode.insertBefore(element, lastElem);
  });
};
module.exports = insertNodes;
