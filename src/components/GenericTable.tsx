import React, { useState } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { Search, PencilSquare, PlusSquare, Trash, Eye } from 'react-bootstrap-icons';
import { TableProps } from '../model/CamposTablaGenerica';

const GenericTable: React.FC<TableProps> = ({ data, columns, actions, onAdd, onUpdate, onDelete, onView }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter(item => 
    columns.some(column => 
      item[column.field].toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Container>
      <Row className="align-items-center">
        <Col sm={6}>
          {actions.create && <Button variant="primary" onClick={onAdd}><PlusSquare /></Button>}
        </Col>
        <Col sm={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={handleSearch}
            />
            <InputGroup>
              <Button variant="outline-secondary"><Search /></Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: `${column.width ? column.width * 100/12 : ""}%` }}>{column.title}</th>
            ))}
            {(actions.update || actions.delete || actions.view) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map((column, key) => (
                <td key={key}>
                  {column.render ? column.render(item) : item[column.field]}
                </td>
              ))}
              <td>
                {actions.update && <Button variant="primary" className='mx-2' onClick={() => onUpdate!(item)}><PencilSquare /></Button>}
                {actions.delete && <Button variant="danger" className='mx-2' onClick={() => onDelete!(item)}><Trash /></Button>}
                {actions.view && <Button variant="info" className='mx-2' onClick={() => onView!(item)}><Eye /></Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GenericTable;
