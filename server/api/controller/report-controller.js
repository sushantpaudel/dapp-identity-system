const { Report } = require('../../models');
const logger = require('../../config/logger');
const { deleteItem } = require('../../config/delete');

class ReportController {
  static async getAll(req, res) {
    Report.findAll({ where: { isDeleted: false } })
      .then(reports => {
        res.send({ success: true, reports });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({ success: false, message: 'Error!!' });
      });
  }
  static async getOne(req, res) {
    Report.findOne({ where: { id: req.params.id, isDeleted: false } })
      .then(report => {
        res.send({ success: true, report });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({ success: false, message: 'Error!!' });
      });
  }
  static async post(req, res) {
    const report = req.body;
    Report.create(report)
      .then(_ => {
        res.send({
          success: true,
          message: 'Report Information saved successfully',
        });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({ success: false, message: 'Error!!' });
      });
  }
  static async put(req, res) {
    const reportData = req.body;
    Report.update(reportData, { where: { id: reportData.id } })
      .then(_ => {
        res.send({
          success: true,
          message: 'Report Data updated successfully',
        });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({ success: false, message: 'Error!!' });
      });
  }
  static async delete(req, res) {
    deleteItem(Report, req.params.id, req.payload)
      .then(_ => {
        res.send({ success: true, message: 'Report Data deleted successfully' });
      })
      .catch(err => {
        logger.error(err);
        res.status(500).send({ success: false, message: 'Error!!' });
      });
  }
}

module.exports = ReportController;
