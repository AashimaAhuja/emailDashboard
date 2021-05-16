export const createElement = (ele, attributes) => {
  const node = document.createElement(ele);
  Object.keys(attributes).forEach(key => {
    node.setAttribute(key, attributes[key]);
  });

  return node;
};
