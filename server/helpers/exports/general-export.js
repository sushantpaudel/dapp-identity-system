const { User, Role } = require('../../models');
const { exportExcelData } = require('../excel');

module.exports.getAllUsers = async (search, attributes, userId) => {
  const users = await User.findAll({
    raw: true,
    where: { isDeleted: false },
    attributes: {
      exclude: ['password', 'loginAttempts', 'loginAttemptsCount'],
      ...(attributes ? { include: attributes } : {}),
    },
  });
  const data = await exportExcelData(
    [users],
    {
      type: 'Admin',
      isDeleted: 'Has been deleted',
      isVerified: 'Has been verified',
      username: 'Username',
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      gender: 'Gender',
      dateOfBirth: 'Date of birth',
      phoneNumber: 'Phone number',
      createdAt: 'Created Date',
      updatedAt: 'Updated Date',
    },
    [`User's List`],
    'User-Export',
    'user',
    userId,
  );
  return data;
};

module.exports.getAllRoles = async (search, attributes, userId) => {
  const roles = await Role.findAll({
    raw: true,
    where: { isDeleted: false },
    attributes: {
      ...(attributes ? { include: attributes } : {}),
    },
  });
  const data = await exportExcelData(
    [roles],
    {
      isDeleted: 'Has been deleted',
      name: 'Role Name',
      createdAt: 'Created Date',
      updatedAt: 'Updated Date',
    },
    [`Role's List`],
    'Role-Export',
    'role',
    userId,
  );
  return data;
};
