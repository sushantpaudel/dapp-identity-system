import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ReportOptions from './ReportOptions';

const ReportForm = ({ onChange, onSubmit, setType, report }) => {
  return (
    <Form className="row" onSubmit={onSubmit}>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Name</window.t>
        </Label>
        <Input required name="name" type="text" value={report.name || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Report Type</window.t>
        </Label>
        <Input required name="reportType" type="select" value={report.reportType || ''} onChange={onChange}>
          <ReportOptions />
        </Input>
      </FormGroup>
      <FormGroup className="col-md-12">
        <Label>
          <window.t>Query</window.t>
        </Label>
        <Input rows={5} required name="query" type="textarea" value={report.query || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Sequence</window.t>
        </Label>
        <Input name="sequence" type="number" value={report.sequence || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Column Size</window.t>
        </Label>
        <Input required name="colSize" type="number" value={report.colSize || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Styles</window.t>
        </Label>
        <Input name="styles" type="textarea" value={report.styles || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup className="col-md-6">
        <Label>
          <window.t>Options</window.t>
        </Label>
        <Input name="options" type="textarea" value={report.options || ''} onChange={onChange} />
      </FormGroup>
      <Button size="sm" type="button" className="mx-2" color="primary" onClick={() => setType('')}>
        <window.t>Cancel</window.t>
      </Button>
      <Button size="sm" type="submit" color="success">
        <window.t>Submit</window.t>
      </Button>
    </Form>
  );
};

export default ReportForm;
