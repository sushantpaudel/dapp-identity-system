import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Container,
  FormGroup,
  Label,
} from 'reactstrap';
import { getFileMeta, uploadFile } from './api';
import { toast } from 'react-toastify';
import { setLoading } from 'admin/redux/actions/miscAction';
import { connect } from 'react-redux';
import { downloadURI } from 'config/util';
import _ from 'lodash';

const baseStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '100px',
  height: '300px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const FileDump = props => {
  const [metas, setMetas] = useState([]);
  const [file, setFile] = useState();
  const [option, setOption] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 1) {
      toast.warning('Could not upload two files at a time');
      return;
    }
    acceptedFiles.forEach(file => {
      setFile(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    // open,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', file);
    if (!option) {
      toast.warning('Please select an option');
      return;
    }
    if (!file) {
      toast.warning('Please select a file to upload');
      return;
    }
    props.dispatch(setLoading(true));
    uploadFile(data, option).then(json => {
      if (json.success) {
        toast.success('Completed!');
        setFile();
        setOption('');
      } else {
        toast.error('Error!');
      }
      props.dispatch(setLoading(false));
    });
  };

  useEffect(() => {
    getFileMeta().then(json => {
      if (json.success) {
        setMetas(json.data);
      }
    });
  }, []);

  return (
    <Card className="custom-form-group">
      <CardHeader className="card-header">
        <Row>
          <Col md={6}>
            <window.t>Upload file file</window.t>
          </Col>
          <Col md={6}>
            <Button
              size="sm"
              color="primary"
              className="float-right"
              onClick={() => {
                const meta = _.find(metas, { key: option });
                if (meta) {
                  downloadURI(meta.downloadUrl, meta.name);
                } else {
                  toast.warning(`Please select an option`);
                }
              }}
            >
              <i className="fa fa-download" /> <window.t>Download Template</window.t>
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="admin-card-body">
        <Container>
          <Row>
            <Col sm={8} md={5}>
              <FormGroup className="my-3">
                <Label>
                  <window.t>Option of the Excel file</window.t>
                </Label>
                <Input type="select" value={option} onChange={e => setOption(e.target.value)}>
                  <option value="">{window.t('Please select an option')}</option>
                  {metas.map(meta => (
                    <option key={meta.id} value={meta.key}>
                      {meta.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <div className="admin-card-body" {...getRootProps({ style })}>
                {file ? (
                  <h2 style={{ textAlign: 'center' }}>{file.name}</h2>
                ) : (
                  <>
                    <input {...getInputProps()} />
                    <h2 style={{ textAlign: 'center' }}>
                      <i className="fa fa-file" />
                      {isDragActive ? ' Drop Here...' : ' Upload Here...'}
                    </h2>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </CardBody>
      <CardFooter className="card-header">
        <Button className="float-right button" color="success" onClick={onSubmit} size="sm">
          <window.t>Submit</window.t>
        </Button>
        <Button
          className="mx-2 float-right button"
          color="info"
          onClick={() => {
            setOption('');
            setFile();
          }}
          size="sm"
        >
          <window.t>Cancel</window.t>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default connect()(FileDump);
