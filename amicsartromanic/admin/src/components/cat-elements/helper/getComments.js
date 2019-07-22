const filterNone = () => {
  return NodeFilter.FILTER_ACCEPT;
};

const getComment = (rootElem, value) => {
  let comment = {};
  let finded = false;
  // Fourth argument, which is actually obsolete according to the DOM4 standard, is required in IE 11
  const iterator = document.createNodeIterator(
    rootElem,
    NodeFilter.SHOW_COMMENT,
    filterNone,
    false
  );
  let curNode = {};
  // eslint-disable-next-line no-cond-assign
  while ((curNode = iterator.nextNode()) && !finded) {
    if (curNode.nodeValue.trim() === value) {
      comment = curNode;
      finded = true;
    }
  }
  return comment;
};
module.exports = getComment;
