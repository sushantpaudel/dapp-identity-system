import React from 'react';
import { toast } from 'react-toastify';
import { editReport } from './api';
import ReportForm from './ReportForm';

const EditReport = props => {
  const onChange = ({ target: { name, value } }) => {
    const report = props.report || {};
    switch (name) {
      default:
        report[name] = value;
    }
    props.setReport({ ...report });
  };
  const onSubmit = e => {
    e.preventDefault();
    editReport(props.report).then(data => {
      if (data.success) {
        toast.success(`Successful`);
        props.setType('');
      } else {
        toast.warning(`Unsuccessful`);
      }
    });
  };
  return <ReportForm onChange={onChange} onSubmit={onSubmit} report={props.report} setType={props.setType} />;
};

export default EditReport;
