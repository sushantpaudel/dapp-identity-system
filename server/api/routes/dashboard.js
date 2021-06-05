const router = require('express').Router();
const { Report, sequelize } = require('../../models');
const logger = require('../../config/logger');
const _ = require('lodash');
const { Op, QueryTypes } = require('sequelize');

const processData = async rawReports => {
  const data = await Promise.all(
    rawReports.map(async report => {
      try {
        const result = await sequelize.query(report.query, {
          type: QueryTypes.SELECT,
        });
        const data = [];
        const labels = [];
        result.forEach(row => {
          data.push(row.data);
          labels.push(row.labels);
        });
        return {
          ...report,
          data,
          labels,
        };
      } catch (err) {
        console.log(err);
        return null;
      }
    }),
  );
  const reports = data.filter(o => {
    if (o && o.data && o.labels) {
      return 1;
    }
    return 0;
  });
  return reports;
};

router.get('/dashboard/reports', (req, res, next) => {
  Report.findAll({
    raw: true,
    where: { isDeleted: false, query: { [Op.not]: null } },
    order: [['sequence', 'ASC']],
  })
    .then(async rawReports => {
      const reports = await processData(rawReports);
      res.send({ success: true, reports });
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send({ success: false, message: 'Error!!' });
    });
});

module.exports = router;
