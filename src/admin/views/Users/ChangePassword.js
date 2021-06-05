import { server } from 'admin/server';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const ChangePassword = ({ cancel }) => {
  const [payload, setPayload] = useState({});
  const onChange = ({ target: { name, value } }) => setPayload({ ...payload, [name]: value });
  const onSubmit = e => {
    e.preventDefault();
    if (payload.newPassword !== payload.confirmPassword) {
      toast.warning(`Both password are not the same`);
      return;
    }
    server
      .post(`/users/change-password`, {
        password: payload.password,
        newPassword: payload.newPassword,
      })
      .then(res => res.data)
      .then(json => {
        if (json.success) {
          toast.success(json.message);
        } else {
          toast.warning(json.message);
        }
        cancel();
      })
      .catch(() => {});
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>
          <window.t>Old Password</window.t>
        </Label>
        <Input name="password" type="password" value={payload.password || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label>
          <window.t>New Password</window.t>
        </Label>
        <Input name="newPassword" type="password" value={payload.newPassword || ''} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label>
          <window.t>Confirm Password</window.t>
        </Label>
        <Input name="confirmPassword" type="password" value={payload.confirmPassword || ''} onChange={onChange} />
      </FormGroup>
      <Button className="mx-1 float-right" size="sm" color="success" type="submit">
        <window.t>Submit</window.t>
      </Button>
      <Button className="mx-1 float-right" size="sm" color="info" type="button" onClick={cancel}>
        <window.t>Cancel</window.t>
      </Button>
    </Form>
  );
};

export default ChangePassword;
