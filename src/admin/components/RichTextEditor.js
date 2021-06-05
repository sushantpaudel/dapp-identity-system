import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditor = ({ name, onChange, config, value, ...props }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={config}
      // onInit={(editor) => setEditor(editor)}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange({ target: { name: name, value: data } });
      }}
    />
  );
};

export default RichTextEditor;
