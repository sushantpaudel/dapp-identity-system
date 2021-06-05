import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, Table, Card, CardHeader, CardBody, Button } from 'reactstrap';
import AddReport from './AddReport';
import { getReport, getReports } from './api';
import EditReport from './EditReport';

const ReportList = props => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({});
  const [type, setType] = useState('');
  useEffect(() => {
    getReports().then(d => {
      if (d.success) {
        setReports(d.reports);
      }
    });
  }, []);
  const p = props.permissions || {};
  return (
    <Card>
      <Modal className="w-100" isOpen={type !== ''} toggle={() => setType('')}>
        <ModalHeader>
          {type === 'add' && 'Add Report'}
          {type === 'edit' && report.id && 'Edit Report'}
        </ModalHeader>
        <ModalBody>
          {type === 'add' && <AddReport report={report} setReport={setReport} setType={setType} />}
          {type === 'edit' && report.id && <EditReport report={report} setReport={setReport} setType={setType} />}
        </ModalBody>
      </Modal>
      <CardHeader>
        <span>
          <window.t>Report List</window.t>
        </span>
        {p.isAdmin && (
          <Button
            className="float-right"
            size="sm"
            color="success"
            onClick={() => {
              setType('add');
              setReport({});
            }}
          >
            <window.t>Add Report</window.t>
          </Button>
        )}
      </CardHeader>
      <CardBody>
        <Table>
          <thead>
            <tr>
              <th>
                <window.t>Name</window.t>
              </th>
              <th>
                <window.t>Sequence</window.t>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.sequence}</td>
                <td>
                  {p.isAdmin && (
                    <Button
                      size="sm"
                      color="info"
                      onClick={() => {
                        setType('edit');
                        getReport(r.id).then(r => {
                          if (r.success) {
                            setReport(r.report);
                          } else {
                            toast.warning(`Error occurred`);
                          }
                        });
                      }}
                    >
                      <i className="fa fa-edit" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default connect(state => ({
  permissions: state.permissions,
}))(ReportList);
