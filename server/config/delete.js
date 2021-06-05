module.exports.deleteItem = async (Model, itemId, payload) => {
  return await Model.update({ isDeleted: true }, { where: { id: itemId } });
};
