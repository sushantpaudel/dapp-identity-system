import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Row, Col, Table } from 'reactstrap';
import { getDigitalIdentities, deleteDigitalIdentity } from './api';
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
  const [digitalIdentities, setDigitalIdentities] = useState([]);
  const [searchString, setSearchString] = useState('');
  const { setPageNumber, pageSize, pageNumber, offset, setPaginationValues, ...paginationProps } = usePagination();
  const updateData = () => {
    const params = getPageParams(pageNumber, pageSize);
    getDigitalIdentities({ ...params, searchString }).then(response => {
      if (!response) {
        toast.error(response.message);
        return;
      }
      setDigitalIdentities(response.data.pageData);
      setPaginationValues(response.data);
    });
  };
  useEffect(() => {
    updateData();
  }, [pageSize, pageNumber, offset, searchString]);

  const handleDelete = id => {
    if (window.confirm('Do you want to delete this user? The action is irreversible!')) {
      deleteDigitalIdentity(id).then(response => {
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
            <i className="fa fa-user" /> <window.t>Digital Identities</window.t>
          </Col>
          <Col>
            {p.isAdmin || (p.digitalIdentity && p.digitalIdentity.add) ? (
              <Link className="float-right btn btn-sm btn-success" to={routes.digitalIdentityAdd}>
                <i className="fa fa-plus" /> <window.t>Add Digital Identity</window.t>
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
                <window.t>Citizenship Number</window.t>
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
            {digitalIdentities.map((digitalIdentity, idx) => (
              <tr key={idx}>
                <td>{digitalIdentity.name}</td>
                <td>{digitalIdentity.citizenshipNumber}</td>
                <td>{formatDate(digitalIdentity.createdAt)}</td>
                <td>{formatDate(digitalIdentity.updatedAt)}</td>
                <td>
                  {p.isAdmin || (p.digitalIdentity && p.digitalIdentity.edit) ? (
                    <Link
                      className="btn btn-info btn-sm text-white mr-2"
                      to={routes.digitalIdentityEdit + '?i=' + getHash(digitalIdentity.id)}
                      title="Edit"
                    >
                      <i className="fa fa-edit" />
                    </Link>
                  ) : null}
                  {p.isAdmin || (p.digitalIdentity && p.digitalIdentity.delete) ? (
                    <Button size="sm" color="danger" title="Delete" onClick={() => handleDelete(digitalIdentity.id)}>
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
