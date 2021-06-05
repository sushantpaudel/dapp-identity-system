import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Input, FormGroup, Label, Button, Form } from 'reactstrap';
import { registerAccount } from 'client/redux/actions/accountAc';

const Register = () => {
  const [user, setUser] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  // const [usernameValid, setUsernameValid] = useState(false);
  const onChange = e => {
    const { name, value, type } = e.target;
    switch (type) {
      default:
        user[name] = value;
    }
    setUser({ ...user });
  };
  const onSubmit = e => {
    e.preventDefault();
    registerAccount(user).then(data => {
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.warning(data.message);
      }
    });
  };
  return (
    <div className="container p-2">
      <Form className="register-form" onSubmit={onSubmit}>
        <FormGroup>
          <Label>First Name</Label>
          <Input required type="text" name="firstName" value={user.firstName || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input required type="text" name="lastName" value={user.lastName || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input required type="email" name="email" value={user.email || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label>Username</Label>
          <Input required name="username" value={user.username || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            required
            name="password"
            type={hidePassword ? 'password' : 'text'}
            value={user.password || ''}
            onChange={onChange}
          />
          <div
            className="visible-icon"
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {' '}
            {hidePassword ? <i className="far fa-eye-slash" /> : <i className="far fa-eye" />}
          </div>
        </FormGroup>
        <FormGroup>
          <Button className="btn-primary">Register</Button>
        </FormGroup>
        {/* <p className="text-center">Or Signup Using</p>
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

export default Register;
