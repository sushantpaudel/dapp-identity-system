import moment from 'moment';
import { ADToBS, BSToAD } from 'bikram-sambat-js';
import { Status } from './values';

export const previewDiv = className => {
  // if already full screen; exit
  // else go fullscreen
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    const classEl = document.getElementsByClassName(className);
    if (classEl) {
      const element = classEl[0] || {};
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }
};

export const exportSavedReports = (className, name = ``) => {
  console.log(name);
  const element = document.getElementsByClassName(className)[0];
  if (element) {
    const tableEl = element.getElementsByClassName(`pvtTable`)[0];
    if (tableEl) {
      exportTableToExcel(tableEl, name);
    } else {
      printDiv(`js-plotly-plot`);
    }
  }
  return null;
};

export const getTableData = className => {
  const classEl = document.getElementsByClassName(className);
  if (classEl) {
    const element = classEl[0];
    if (element) {
      return element.outerHTML;
    }
  }
  return null;
};

export const printDiv = className => {
  const classEl = document.getElementsByClassName(className);
  if (classEl) {
    const element = classEl[0];
    if (element) {
      printElement(element);
    }
  }
  return null;
};

export const printElement = element => {
  var mywindow = window.open('', 'PRINT', 'height=400,width=600');

  mywindow.document.write('<html><head><title>' + document.title + '</title>');
  mywindow.document.write('</head><body >');
  mywindow.document.write('<h1>' + document.title + '</h1>');
  mywindow.document.write(element.innerHTML);
  mywindow.document.write('</body></html>');

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  // mywindow.close();

  return true;
};

function exportTableToExcel(tableElement, filename = '') {
  var dataType = 'application/vnd.ms-excel';
  var tableHTML = tableElement.outerHTML.replace(/ /g, '%20');
  filename = filename ? filename + '.xls' : 'excel_data.xls';
  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const href = 'data:' + dataType + ', ' + tableHTML;
    downloadURI(href, filename);
  }
}

export const downloadURI = (uri, name) => {
  var link = document.createElement('a');
  link.href = uri;
  link.target = '_blank';
  if (name) {
    link.download = name;
  }
  link.click();
};

export const formatDate = date => {
  return moment(date).format('Do MMMM YYYY');
};

/**
 * Get page Number and page Size, converts decrease Page NUmber by 1 and returns page Number and page Size as an object.
 * @param pageNumber
 * @param pageSize
 * @returns {{}}
 */
export const getPageParams = (pageNumber, pageSize) => {
  let params = {};
  if (pageNumber) {
    params['pageNumber'] = pageNumber - 1;
  }
  if (pageSize) {
    params['pageSize'] = pageSize;
  }
  return params;
};

/**
 *  Takes Date on BS format `YYYY-MM-DD`, converts it to AD format and returns in `YYYY-MM-DD` format.
 * @param bs
 * @returns Date on `YYYY-MM-DD` format.
 */
export const convertToAD = bs => {
  return BSToAD(bs);
};

/**
 * Takes Date on AD format `YYYY-MM-DD`, converts it to BS format and returns in `YYYY-MM-DD` format.
 * @param ad
 * @returns Date on `YYYY-MM-DD` format.
 */
export const convertToBS = ad => {
  return ADToBS(ad);
};

/**
 * Get Number value as StatusId, and return String value according to the statusId provided.
 * @param statusId
 * @returns {string}
 */
export const getStatus = statusId => {
  if (statusId === 0) return Status.DRAFT;
  if (statusId === 1) return Status.PENDING;
  if (statusId === 2) return Status.APPROVED;
  if (statusId === 3) return Status.RECEIVED;
  if (statusId === 4) return Status.CANCELLED;
  else return Status.COMPLETED;
};
