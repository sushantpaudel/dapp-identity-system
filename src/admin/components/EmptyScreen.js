import adminRoutes from 'admin/meta_routes';
import React from 'react';
import { Button, Container } from 'reactstrap';

const EmptyScreen = ({ message, iconName, hideRoute, ...props }) => {
  return (
    <Container>
      <div
        className="w-100"
        style={{
          flex: 1,
          textAlign: 'center',
          paddingTop: 100,
        }}
      >
        <i className={`fa ${iconName} fa-4x mb-4`} />
        <br />
        <window.t>{message}</window.t>
        <br />
        {hideRoute ? null : (
          <Button
            className="mt-4"
            size="sm"
            color="secondary"
            onClick={() => props.history.push(adminRoutes.excelList)}
          >
            <window.t>Select List</window.t>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default EmptyScreen;
