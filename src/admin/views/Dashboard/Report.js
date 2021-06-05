import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Pie, Doughnut, Bar, Bubble, Line, Radar, Scatter } from 'react-chartjs-2';

const getRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const backgroundColor = length => {
  const colors = [];
  let randomColor;
  for (let i = 0; i < length; i++) {
    randomColor = getRandomColor();
    colors.push(randomColor);
  }
  return colors;
};

const CardReport = ({ count, label, options }) => {
  const bgColor = options.bgColor ? options.bgColor : 'bg-arielle-smile';
  return (
    <div className={'card mb-3 widget-chart text-white card-border ' + bgColor}>
      <div className="icon-wrapper rounded-circle">
        <div className="icon-wrapper-bg bg-white opacity-10" />
        {options.iconName ? <i className={options.iconName} /> : <i className="fa fa-chart-pie" />}
      </div>
      <div className="widget-numbers">{count}</div>
      <div className="widget-subheading">{label}</div>
    </div>
  );
};

const Report = ({ report }) => {
  const data = {
    labels: report.labels,
    datasets: [
      {
        data: report.data,
        label: report.name,
        backgroundColor: backgroundColor(report.data.length),
      },
    ],
  };
  // const styles = JSON.parse(report.styles || "{}") || {};
  const options = JSON.parse(report.options || '{}') || {};
  if (report.reportType === 'small-card') {
    return <CardReport count={report.data[0]} label={report.labels[0]} options={options} />;
  }
  return (
    <Card>
      <CardHeader>{report.name}</CardHeader>
      <CardBody>
        {report.reportType === 'line' && <Line data={data} />}
        {report.reportType === 'bar' && <Bar data={data} />}
        {report.reportType === 'pie' && <Pie data={data} />}
        {report.reportType === 'doughnut' && <Doughnut data={data} />}
        {report.reportType === 'radar' && <Radar data={data} />}
        {report.reportType === 'bubble' && <Bubble data={data} />}
        {report.reportType === 'scatter' && <Scatter data={data} />}
      </CardBody>
    </Card>
  );
};

export default Report;
