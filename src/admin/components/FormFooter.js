import React from 'react';
import { Button } from 'reactstrap';

const FormFooter = ({ isEdit }) => {
  return (
    <div className="float-right mt-3">
      <Button className="mx-1" size="sm" color="primary" type="button" onClick={() => window.history.back()}>
        Cancel
      </Button>
      <Button className="mx-1" size="sm" color="success" type="submit">
        {isEdit ? 'Update' : 'Submit'}
      </Button>
    </div>
  );
};

export default FormFooter;
