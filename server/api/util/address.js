const { Address } = require('../../models');

const createAddress = async (PivotAddress, id, key, addressDetail, t) => {
  const address = addressDetail && (await Address.create(addressDetail, { transaction: t }));
  return PivotAddress.create({ [key]: id, addressId: address.id }, { transaction: t });
};

const updateAddress = async (PivotAddress, id, key, addressDetail, t) => {
  const pivotData = await PivotAddress.findOne({ where: { [key]: id } });
  if (pivotData) {
    return Address.update(addressDetail, { where: { id: pivotData.addressId }, transaction: t });
  } else {
    return Address.create(addressDetail, { transaction: t });
  }
};

module.exports = { createAddress, updateAddress };
