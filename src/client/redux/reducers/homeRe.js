import A from '../actions'; //Import the actions types constant we defined in our actions

const promotions = (state = [], action) => {
  switch (action.type) {
    case A.SET_PROMOTIONS:
      return action.payload;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case A.SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

const optionGroups = (state = [], action) => {
  switch (action.type) {
    case A.SET_OPTION_GROUPS:
      return action.payload;
    default:
      return state;
  }
};

const paymentTypes = (state = [], action) => {
  switch (action.type) {
    case A.SET_PAYMENT_TYPES:
      return action.payload;
    default:
      return state;
  }
};

const currency = (state = 'Rs.', action) => {
  switch (action.type) {
    case A.SET_CURRENCY:
      return action.payload;
    default:
      return state;
  }
};

const esewaMerchantCode = (state = 'epay_payment', action) => {
  switch (action.type) {
    case A.SET_ESEWA_MERCHANT_CODE:
      return action.payload;
    default:
      return state;
  }
};

const shippingAddresses = (state = [], action) => {
  switch (action.type) {
    case A.SET_SHIPPING_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};

export default {
  promotions,
  categories,
  optionGroups,
  paymentTypes,
  currency,
  esewaMerchantCode,
  shippingAddresses,
};
