import React, { useEffect, useState } from 'react';
import { convertToAD, convertToBS } from '../../config/util';
import { NepaliDatePicker } from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import moment from 'moment';

export const CustomCalendar = ({ handleChange, name, dateValue, inputClassName }) => {
  const [dateType, setDateType] = useState('AD');
  useEffect(() => {}, [dateType]);

  const onChange = value => {
    handleChange({ target: { name: name, value } });
  };

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button size="sm" disabled color="primary">
          {dateType}
        </Button>
      </InputGroupAddon>
      {dateType === 'BS' ? (
        <NepaliDatePicker
          inputClassName={inputClassName}
          value={
            dateValue ? convertToBS(moment(dateValue).format('YYYY-MM-DD')) : convertToBS(moment().format('YYYY-MM-DD'))
          }
          onChange={value => {
            onChange(convertToAD(value));
          }}
        />
      ) : (
        <Input
          type="date"
          value={moment(dateValue).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD')}
          name={name}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
      )}
      <InputGroupAddon addonType="append">
        <Button
          size="sm"
          onClick={() => {
            setDateType(dateType === 'AD' ? 'BS' : 'AD');
          }}
        >
          <i className="fa fa-exchange-alt" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
};
