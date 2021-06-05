import React, { useState } from 'react';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { signIn } from 'client/redux/actions/accountAc';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const login = e => {
    e.preventDefault();
    if (username && password) {
      props.dispatch(
        signIn({
          username: username.toLowerCase().trim(),
          password,
        }),
      );
    }
  };
  return (
    <div className="container p-2">
      <Form className="login-form" onSubmit={login}>
        <FormGroup>
          <Label>Email / Username</Label>
          <Input name="username" value={username} onChange={({ target: { value } }) => setUsername(value)} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            value={password}
            type={hidePassword ? 'password' : 'text'}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <div
            className="visible-icon"
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {' '}
            {hidePassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
          </div>
        </FormGroup>
        <FormGroup>
          <Button className="btn-primary">Login</Button>
        </FormGroup>
        {/* <p className="text-center">Or Sign In Using</p>
        <div className="social-icons text-center">
          <span className="fb-icon mr-3">
            <i className="fab fa-facebook-f"></i> Facebook
          </span>
          <span className="google-icon">
            <i className="fab fa-google"></i> Google
          </span>
        </div> */}
      </Form>
    </div>
  );
};
export default connect()(Login);
