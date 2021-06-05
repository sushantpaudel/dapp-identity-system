import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Row, Col, Table } from 'reactstrap';
import { getRoles, deleteRole } from './api';
import routes from 'admin/meta_routes';
import { getHash } from 'config/url';
import { useSelector } from 'react-redux';
import ExcelExport from 'admin/components/ExcelExport';
import SearchBox from 'admin/components/SearchBox';
import { toast } from 'react-toastify';
import { formatDate, getPageParams } from '../../../config/util';
import { PaginationBar, usePagination } from '../../components/Pagination';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const permissions = useSelector(state => state.permissions) || [];
  const [searchString, setSearchString] = useState('');
  const { setPageNumber, pageSize, pageNumber, offset, setPaginationValues, ...paginationProps } = usePagination();
  const updateData = () => {
    const params = getPageParams(pageNumber, pageSize);
    getRoles({ ...params, searchString }).then(response => {
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      setRoles(response.data.pageData);
      setPaginationValues(response.data);
    });
  };
  const handleDelete = id => {
    if (window.confirm('Do you want to delete the Roles? The action is irreversible!')) {
      deleteRole(id).then(response => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
        updateData();
      });
    }
  };

  useEffect(() => {
    updateData();
  }, [pageSize, pageNumber, offset, searchString]);

  const p = permissions ? permissions : {};
  return (
    <Card className="custom-form-group shadow">
      <CardHeader className="card-header">
        <Row>
          <Col>
            <i className="fa fa-user" /> <window.t>Roles</window.t>
          </Col>
          <Col>
            {p.isAdmin || (p.role && p.role.add) ? (
              <Link className="float-right btn btn-sm btn-success" to={routes.rolesAdd}>
                <i className="fa fa-plus" /> <window.t>Add Role</window.t>
              </Link>
            ) : null}
            <SearchBox
              className="float-right"
              onSubmit={text => {
                setPageNumber(1);
                setSearchString(text);
              }}
              placeholder="Search here..."
            />
            <ExcelExport className="float-right" name="Roles list" type="role" />
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="admin-card-body">
        <Table>
          <thead>
            <tr>
              <th>
                <window.t>Name</window.t>
              </th>
              <th>
                <window.t>Created Date</window.t>
              </th>
              <th>
                <window.t>Updated Date</window.t>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {roles.map((role, idx) => (
              <tr key={idx}>
                <td>{role.name}</td>
                <td>{formatDate(role.createdAt)}</td>
                <td>{formatDate(role.updatedAt)}</td>
                <td>
                  {p.isAdmin || (p.role && p.role.edit) ? (
                    <Link
                      className="btn btn-info btn-sm text-white mr-2"
                      to={routes.rolesEdit + '?i=' + getHash(role.id)}
                    >
                      <i className="fa fa-edit" />
                    </Link>
                  ) : null}
                  {p.isAdmin || (p.role && p.role.delete) ? (
                    <Button size="sm" color="danger" onClick={() => handleDelete(role.id)}>
                      <i className="fa fa-trash" />
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationBar offset={offset} pageSize={pageSize} pageNumber={pageNumber} {...paginationProps} />
      </CardBody>
    </Card>
  );
};

export default Roles;
