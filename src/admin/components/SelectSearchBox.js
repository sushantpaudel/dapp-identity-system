import { server } from 'admin/server';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

const SelectSearchBox = ({ url, setValue }) => {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const onChange = selectedOption => {
    const value = _.find(rawData, { id: selectedOption.value });
    if (value) {
      setValue(value);
    }
  };
  const getData = async inputValue => {
    try {
      const json = await server.get(`/search/${url}`, { params: { searchString: inputValue } }).then(res => res.data);
      let data = [];
      if (json.success) {
        setRawData(json.data);
        data = json.data.map(d => ({ value: d.id, label: d.name }));
      }
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
  useEffect(() => {
    getData('').then(data => setData(data));
  }, []);
  return <AsyncSelect defaultOptions={data} loadOptions={getData} onChange={onChange} />;
};

export default SelectSearchBox;
