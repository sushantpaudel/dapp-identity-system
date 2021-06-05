import React from 'react';
import { server } from 'admin/server';
import { downloadURI } from 'config/util';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';

const ExcelExport = ({ className, name, type, search = {} }) => {
  return (
    <Button
      className={className}
      type="button"
      size="sm"
      color="primary"
      onClick={() => {
        server
          .get(`/excel-export/${type}`, { params: search })
          .then(res => res.data)
          .then(json => {
            if (json.success) {
              downloadURI(json.downloadUrl, name);
            } else {
              toast.warning(json.message || `Oops! Something went wrong`);
            }
          });
      }}
    >
      <i className="fa fa-file-excel" />
    </Button>
  );
};

export default ExcelExport;
