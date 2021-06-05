import React, { useState } from 'react';
import { Button, Form, Input } from 'reactstrap';

const SearchBox = ({ className = ``, onSubmit, placeholder }) => {
  const [searchString, setSearchString] = useState(``);
  return (
    <Form
      className={`d-flex flex-row mx-4 ${className}`}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(searchString);
      }}
    >
      <Input
        className="border-0"
        type="text"
        name="searchString"
        placeholder={placeholder}
        value={searchString || ``}
        onChange={({ target: { value } }) => setSearchString(value)}
      />
      <Button type="submit" className="ml-1" color="info" size="sm" title="Search">
        <i className="fa fa-search" />
      </Button>
    </Form>
  );
};

export default SearchBox;
