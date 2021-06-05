import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { getReports } from './api';
import Report from './Report';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReports().then(data => {
      if (data.success) {
        setReports(data.reports);
      }
    });
  }, []);
  return (
    <Row>
      {reports.map(report => (
        <Col key={report.id} className="py-2" md={report.colSize || 3}>
          <Report report={report} />
        </Col>
      ))}
    </Row>
  );
};

export default Dashboard;
