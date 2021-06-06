import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import useValidationForm from 'validation';
import digitalIdentitySchema from 'validation/digital-identity-schema';

const DigitalIdentityForm = ({ isEdit, digitalIdentity, onSubmit, onChange, title }) => {
  const { register, showError } = useValidationForm(digitalIdentitySchema);
  const payload = digitalIdentity.payload;
  return (
    <Row>
      <Col md={6}>
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
                  <window.t>Phone Number</window.t>
                </Label>
                <Input
                  name="phoneNumber"
                  value={digitalIdentity.phoneNumber || ''}
                  type="phoneNumber"
                  {...register('phoneNumber')}
                />
                {showError('phoneNumber')}
              </FormGroup>
              <FormGroup>
                <Label>
                  <window.t>Address</window.t>
                </Label>
                <Input name="address" value={digitalIdentity.address || ''} type="address" {...register('address')} />
                {showError('address')}
              </FormGroup>
              {isEdit && (
                <FormGroup>
                  <Label>
                    <window.t>Public Key</window.t>
                  </Label>
                  <Input name="publicKey" type="text" disabled={true} value={digitalIdentity.publicKey || ''} />
                </FormGroup>
              )}
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
      </Col>
      {isEdit && payload && (
        <Col md={6}>
          <Card>
            <CardHeader>
              <window.t>Blockchain Stored Data</window.t>
            </CardHeader>
            <CardBody>
              <Table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{payload.name}</td>
                  </tr>
                  <tr>
                    <th>Citizenship Number</th>
                    <td>{payload.citizenshipNumber}</td>
                  </tr>
                  <tr>
                    <th>Phone Number</th>
                    <td>{payload.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{payload.address}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default DigitalIdentityForm;
