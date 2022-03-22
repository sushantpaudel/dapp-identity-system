const { faker } = require('@faker-js/faker');
const loadtest = require('loadtest');

const MAX_NUMBER_REQUESTS = 1000;
const CONCURRENCY = 10;

let optionObject = {
  url: 'http://localhost:8181/api/digital-identity/central',
  maxRequests: MAX_NUMBER_REQUESTS,
  concurrency: CONCURRENCY,
  method: 'POST',
  contentType: 'applicaton/json',
  body: null,
  method: 'POST',
  headers: {
    Authorization: 'Admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQG9hc3lzLmNvbS5ucCIsInJvbGVJZHMiOlsyXSwiaWF0IjoxNjQ3OTc1NzAxfQ.dnyHlLNxHom5wfaNr8cKle4BTWZStGeKP5ULkdmKiPE'
  }
}

// for (let i = 0; i< 10000; i= i+1){
  const userData = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    citizenshipNumber: faker.datatype.uuid(),
    phoneNumber: faker.phone.phoneNumber(),
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`
  }
  optionObject.body = userData;

  loadtest.loadTest(optionObject, (err, result) => {
    if(err) {
      console.error(err);
    }else{
      console.log('Result: ', result);
    }
  })
// }