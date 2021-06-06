import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import useValidationForm from 'validation';
import digitalIdentitySchema from 'validation/digital-identity-schema';

const DigitalIdentityForm = ({ digitalIdentity, onSubmit, onChange, title }) => {
  const { register, showError } = useValidationForm(digitalIdentitySchema);
  return (
    <Card className="custom-form-group shadow">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <CardHeader className="card-header">
          <window.t>{title}</window.t>
        </CardHeader>
        <CardBody className="admin-card-body">
          <FormGroup>
            <Label>
              <window.t>Name</window.t>
            </Label>
            <Input name="name" {...register('name')} value={digitalIdentity.name || ''} />
            {showError('name')}
          </FormGroup>

          <FormGroup>
            <Label>
              <window.t>Citizenship Number</window.t>
            </Label>
            <Input
              name="citizenshipNumber"
              value={digitalIdentity.citizenshipNumber || ''}
              type="citizenshipNumber"
              {...register('citizenshipNumber')}
            />
            {showError('citizenshipNumber')}
          </FormGroup>
          <FormGroup>
            <Label>
              <window.t>Public Key</window.t>
            </Label>
            <Input name="publicKey" type="password" disabled={true} value={digitalIdentity.publicKey || ''} />
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button color="success" size="sm">
            <window.t>Submit</window.t>
          </Button>
          <Button color="secondary" type="reset" className="mx-2" size="sm" onClick={() => window.history.back()}>
            <window.t>Cancel</window.t>
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default DigitalIdentityForm;
