import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  Container,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import routes from 'admin/meta_routes';
import { Redirect } from 'react-router';
import { login } from '../../admin/redux/actions/authAction';
import { server } from 'admin/server';
import { toast } from 'react-toastify';
import { setLoading } from 'admin/redux/actions/miscAction';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState('');
  const [email, setEmail] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const forgotPassword = () => {
    props.dispatch(setLoading(true));
    server
      .post('/users/forgot-password', { email })
      .then(res => res.data)
      .then(json => {
        if (json.success) {
          toast.success(json.message);
        } else {
          toast.warning(json.message);
        }
        props.dispatch(setLoading(false));
      })
      .catch(err => {
        const json = err.response.data;
        toast.warning(json.message);
        props.dispatch(setLoading(false));
      });
  };
  const onLogin = e => {
    e.preventDefault();
    props.dispatch(
      login({
        username,
        password,
      }),
    );
  };
  if (props.authUser.isAuthenticated) {
    return <Redirect to={routes.adminHome} />;
  }
  return (
    <Container className="w-100 justify-content-center">
      <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
        <ModalHeader>
          <window.t>Forgot password</window.t>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>
              <window.t>Email</window.t>
            </Label>
            <Input name="forgotPassword" value={email} onChange={({ target: { value } }) => setEmail(value)} />
          </FormGroup>
          <FormGroup>
            <Button size="sm" color="success" className="float-right" onClick={forgotPassword}>
              <window.t>Submit</window.t>
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
      <Card className="mt-4 w-50">
        <CardHeader>
          <h4>Login</h4>
        </CardHeader>
        <CardBody className="admin-card-body">
          <Form onSubmit={onLogin}>
            <FormGroup>
              <Label>Username</Label>
              <Input value={username} onChange={({ target: { value } }) => setUsername(value)} />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <InputGroup>
                <Input
                  type={hidePassword ? 'password' : 'text'}
                  value={password}
                  onChange={({ target: { value } }) => setPassword(value)}
                />
                <InputGroupAddon addonType="append">
                  <Button className="button" type="button" onClick={() => setHidePassword(!hidePassword)}>
                    {hidePassword ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Button className="float-right" type="submit" color="success" size="sm">
                Login
              </Button>
              <Button className="float-right" type="button" color="none" size="sm" onClick={() => setIsOpen(true)}>
                <window.t>Forgot password</window.t> ?
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default connect(state => ({ authUser: state.authUser }))(Login);
