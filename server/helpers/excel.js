const XLSX = require('xlsx');
const logger = require('../config/logger');
const { ExcelExport } = require('../models');
const { createDirWithFileName } = require('../config/filesystem');
const chalk = require('chalk');
const _ = require('lodash');

/**
 *
 * @param {String} filePath
 * @param {String} sheetName
 * @param {Object} options
 * @returns Excel data in json or array with respect to options
 */
const getExcelData = (filePath, sheetName, options = {}) => {
  const wb = XLSX.readFile(filePath);
  const data = XLSX.utils.sheet_to_json(
    wb.Sheets[sheetName || wb.SheetNames[0]],
    /**
     * {header : 1} gives data in the format [[],[],[],...]
     */
    // { header: 1 }
    options,
  );
  return data;
};

/**
 *
 * @param {String} filePath
 * Returns merged excel compatible with kobotoolbox format
 */
const getMergedExcelData = filePath => {
  let isLoop = true;
  console.log(chalk.blue(`Started Reading excel`));
  const { Sheets, SheetNames } = XLSX.readFile(filePath);
  console.log(chalk.blue(`Reading excel completed`));
  let data = [];
  console.time(`CONVERTING SHEET TO JSON`);
  if (SheetNames.length > 1) {
    const firstSheetData = XLSX.utils.sheet_to_json(Sheets[SheetNames[0]], {
      header: 1,
    });
    const secondSheetData = XLSX.utils.sheet_to_json(Sheets[SheetNames[1]], {
      header: 1,
    });
    let secondCounter = 1;
    const firstId = _.findIndex(firstSheetData[0], o => o === '_id');
    const secondId = _.findIndex(secondSheetData[0], o => o === '_submission__id');
    if (firstId >= 0 && secondId >= 0) {
      data.push([...firstSheetData[0], ...secondSheetData[0]]);
      firstSheetData.forEach((firstVal, idx) => {
        if (idx === 0) return;
        const submissionId = firstVal[firstId];
        let secondSubmissionId;
        do {
          const secondVal = secondSheetData[secondCounter];
          if (secondVal) {
            secondSubmissionId = secondVal[secondId];
            secondCounter += 1;
            data.push([...firstVal, ...secondVal]);
          } else {
            secondSubmissionId = null;
          }
        } while (secondSubmissionId === submissionId);
      });
    } else {
      data = firstSheetData;
    }
  } else {
    data = XLSX.utils.sheet_to_json(Sheets[SheetNames[0]], { header: 1 });
  }
  console.timeEnd(`CONVERTING SHEET TO JSON`);
  console.log(chalk.red(`Processing excel data completed`));
  return data;
};

/**
 *
 * @param {Object<Array>} data
 * @param {*} filePath
 */
const createExcel = (data, filePath) => {
  const workbook = XLSX.utils.book_new();
  const keys = Object.keys(data);
  for (const key of keys) {
    const worksheet = XLSX.utils.aoa_to_sheet(data[key]);
    XLSX.utils.book_append_sheet(workbook, worksheet, key);
  }
  createDirWithFileName(filePath);
  XLSX.writeFile(workbook, filePath);
};

/**
 *
 * @param {Array<Array<Object>>} data Array containing arrays of data to make up each sheets
 * @param {Object} headings
 * @param {String} fileName
 * @param {String} fileCategory
 * @param {Number} userId
 * @returns file path of the stored excel data
 */
const exportExcelData = async (data, headings, sheetNames, fileName, fileCategory, userId) => {
  const finalData = {};
  data.forEach((d, idx) => {
    const heading = Object.keys(d[0]);
    const exportData = [];
    exportData.push(heading.map(h => (headings ? headings[h] || h : h)));
    d.forEach(val => {
      const value = [];
      heading.forEach(h => {
        value.push(val[h]);
      });
      exportData.push(value);
    });
    finalData[sheetNames[idx] || `${idx + 1} - sheet`] = exportData;
  });
  const category = fileCategory || 'general';
  const name = `${Date.now()}-${fileName || ''}`;
  const filePath = `resources/excel_export/${category}/${name}.xlsx`;
  createExcel(finalData, filePath, name);
  await ExcelExport.create({
    name,
    userId,
    filePath,
    fileType: `xlsx`,
  });
  return { filePath };
};

module.exports.exportExcelData = exportExcelData;
module.exports.getExcelData = getExcelData;
module.exports.getMergedExcelData = getMergedExcelData;
