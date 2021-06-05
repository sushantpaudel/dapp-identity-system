const createHierarchyFromArray = (items, parentId) => {
  const sortedItems = [];
  if (parentId) {
    const children = items.filter(d => (d.parentId === parentId ? 1 : 0));
    children.forEach(d => {
      sortedItems.push(d, ...createHierarchyFromArray(items, d.id));
    });
  } else {
    const highLevel = items.filter(d => (d.level === 0 ? 1 : 0));
    highLevel.forEach(d => {
      sortedItems.push(d, ...createHierarchyFromArray(items, d.id));
    });
  }
  return sortedItems;
};

module.exports.createHierarchyFromArray = createHierarchyFromArray;
