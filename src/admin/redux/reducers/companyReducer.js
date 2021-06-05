const initState = {
  displayName: 'Oasys I.T. Solutions',
  displayNameNP: 'ओयसिस आइ.टी. सोलुसन्स',
  phoneNumber: '+977 9802853003 / +977 9802853005',
  addressLine1: 'Shantipatan, Lakeside - 06',
  district: 'Kaski',
  city: 'Pokhara',
  email: 'info@oasys.com.np',
};

const company = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default {
  company,
};
