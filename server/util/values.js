module.exports.VERIFICATION_CODE_TYPES = {
  EMAIL_VERIFICATION: 'email_verification',
  FORGOT_PASSWORD: 'forgot_password',
};

module.exports.ROLE_AUTH_VALUES = {
  /**
   * User module
   */
  USER_GET: 'user.view',
  USER_POST: 'user.add',
  USER_PUT: 'user.edit',
  USER_DELETE: 'user.delete',
  /**
   * Role module
   */
  ROLE_GET: 'role.view',
  ROLE_POST: 'role.add',
  ROLE_PUT: 'role.edit',
  ROLE_DELETE: 'role.delete',
  /**
   * Product module
   */
  PRODUCT_GET: 'product.view',
  PRODUCT_POST: 'product.add',
  PRODUCT_PUT: 'product.edit',
  PRODUCT_DELETE: 'product.delete',
  /**
   * Product Category module
   */
  CATEGORY_GET: 'category.view',
  CATEGORY_POST: 'category.add',
  CATEGORY_PUT: 'category.edit',
  CATEGORY_DELETE: 'category.delete',
  /**
   * Purchase Order module
   */
  PURCHASE_ORDER_GET: 'purchaseOrder.view',
  PURCHASE_ORDER_POST: 'purchaseOrder.add',
  PURCHASE_ORDER_PUT: 'purchaseOrder.edit',
  PURCHASE_ORDER_DELETE: 'purchaseOrder.delete',
  /**
   * Super Admin User
   */
  SUPER_ADMIN: 'isAdmin',
};

module.exports.Status = {
  Success: 'Success',
  Client_Error: 'Client Error',
  Server_Error: 'Server Error',
  Information: 'Information',
  Redirect: 'Redirect',
  Unknown: 'Unknown',
};

module.exports.OrderActions = {
  SEND: 'forward',
  APPROVE: 'approve',
  CANCEL: 'cancel',
  RETURN: 'return',
  RECEIVE: 'receive',
  COMPLETE: 'complete',
};

module.exports.OrderStatus = {
  SEND: 1,
  APPROVE: 2,
  RECEIVE: 3,
  RETURN: 0,
  CANCEL: 4,
  COMPLETE: 5,
};
