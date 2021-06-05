import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const useValidationForm = validationSchema => {
  const yupSchema = yup.object().shape(validationSchema);
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    criteriaMode: 'firstError',
    reValidateMode: 'onChange',
    resolver: yupResolver(yupSchema),
  });
  const showError = key => {
    if (errors[key]) {
      return <p style={{ color: 'red', fontSize: 14 }}>{errors[key].message}</p>;
    }
    return null;
  };
  return {
    register,
    showError,
  };
};

export default useValidationForm;
