import getComment from './getComments';

const getNodes = (rootElement, mainPropertyName, mainObjName) => {
  const firstElem = getComment(rootElement, `cat-foreach ${mainPropertyName}, ${mainObjName}`);
  const lastElem = getComment(rootElement, `end cat-foreach ${mainPropertyName}, ${mainObjName}`);
  let firstNode = firstElem.nextSibling;
  const arrayNodes = [];
  console.log(firstNode);

  while (firstNode !== lastElem) {
    if (firstNode.nodeType !== 3) {
      arrayNodes.push(firstNode);
    }
    firstNode = firstNode.nextSibling;
  }
  return arrayNodes;
};

export default getNodes;
