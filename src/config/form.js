const getFormData = event => {
  const formData = {};
  const form = event.target;
  for (let i = 0; i < form.length; i++) {
    const element = form.elements[i];
    const name = element.name;
    const value = element.value;
    const type = element.type;
    if (value) {
      switch (type) {
        case 'checkbox':
          formData[name] = element.checked ? element.checked : null;
          break;
        default:
          formData[name] = value;
          break;
      }
    }
  }
  return formData;
};

export { getFormData };
