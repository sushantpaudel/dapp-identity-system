import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Row, Col, Table } from 'reactstrap';
import { getUsers, deleteUser } from './api';
import routes from 'admin/meta_routes';
import { getHash } from 'config/url';
import ExcelExport from 'admin/components/ExcelExport';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SearchBox from '../../components/SearchBox';
import { formatDate, getPageParams } from '../../../config/util';
import { PaginationBar, usePagination } from '../../components/Pagination';

const Users = () => {
  const permissions = useSelector(state => state.permissions);
  const p = permissions ? permissions : {};
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState('');
  const { setPageNumber, pageSize, pageNumber, offset, setPaginationValues, ...paginationProps } = usePagination();
  const updateData = () => {
    const params = getPageParams(pageNumber, pageSize);
    getUsers({ ...params, searchString }).then(response => {
      if (!response) {
        toast.error(response.message);
        return;
      }
      setUsers(response.data.pageData);
      setPaginationValues(response.data);
    });
  };
  useEffect(() => {
    updateData();
  }, [pageSize, pageNumber, offset, searchString]);

  const handleDelete = id => {
    if (window.confirm('Do you want to delete this user? The action is irreversible!')) {
      deleteUser(id).then(response => {
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
        updateData();
      });
    }
  };

  return (
    <Card className="custom-form-group shadow">
      <CardHeader className="card-header">
        <Row>
          <Col>
            <i className="fa fa-user" /> <window.t>User List</window.t>
          </Col>
          <Col>
            {p.isAdmin || (p.user && p.user.add) ? (
              <Link className="float-right btn btn-sm btn-success" to={routes.usersAdd}>
                <i className="fa fa-plus" /> <window.t>Add User</window.t>
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
            <ExcelExport className="float-right" name="Users list" type="user" />
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
                <window.t>Email</window.t>
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
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
                <td>
                  {p.isAdmin || (p.user && p.user.edit) ? (
                    <Link
                      className="btn btn-info btn-sm text-white mr-2"
                      to={routes.usersEdit + '?i=' + getHash(user.id)}
                      title="Edit"
                    >
                      <i className="fa fa-edit" />
                    </Link>
                  ) : null}
                  {p.isAdmin || (p.user && p.user.delete) ? (
                    <Button size="sm" color="danger" title="Delete" onClick={() => handleDelete(user.id)}>
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

export default Users;
