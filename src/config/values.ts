enum A {
  NONE,
  VIEW,
  VIEW_EDIT,
  VIEW_EDIT_DELETE,
  TOKEN,
  USER_TOKEN,
  LANGUAGE,
}
export const Status = {
  DRAFT: 'Draft',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  CANCELLED: 'Cancelled',
  RECEIVED: 'Received',
  COMPLETED: 'Completed',
};
export const Actions = {
  FORWARD: 'forward',
  RETURN: 'return',
  APPROVE: 'approve',
  CANCEL: 'cancel',
  RECEIVE: 'receive',
  COMPLETE: 'complete',
};
export const pageSizes = [3, 5, 10];

export const NONE = A.NONE;
export const VIEW = A.VIEW;
export const VIEW_EDIT = A.VIEW_EDIT;
export const VIEW_EDIT_DELETE = A.VIEW_EDIT_DELETE;
export const TOKEN = A.TOKEN;
export const USER_TOKEN = A.USER_TOKEN;
export const URL_HASH_KEY = process.env.REACT_APP_URL_HASH_KEY;
export const BASE_URL = window.location.origin;
export const LANGUAGE = A.LANGUAGE;
