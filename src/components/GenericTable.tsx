import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { Search, PencilSquare, PlusSquare, Trash, Eye } from 'react-bootstrap-icons';
import { TableProps } from '../model/CamposTablaGenerica';

function GenericTable<T>({ data, columns, actions, onAdd, onUpdate, onDelete, onView, customSearch }: TableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Variable para controlar si el componente está montado

    const handleSearch = async () => {
      if (customSearch) {
        setIsLoading(true);
        const filteredData = await customSearch(searchText);
        if (isMounted) {
          setFilteredData(filteredData);
          setIsLoading(false);
        }
      } else {
        setFilteredData(
          data.filter((item) => defaultSearch(item, searchText))
        );
      }
    };

    handleSearch();

    // Cleanup: establecer la variable isMounted en false cuando el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [searchText, data, customSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (customSearch) {
      setIsLoading(true);
      const filteredData = await customSearch(searchText);
      setFilteredData(filteredData);
      setIsLoading(false);
    }
  };

  const defaultSearch = (item: T, search: string): boolean =>
    columns.some(column => {
      const value = item[column.field];
      return typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <Container>
      <Row className="align-items-center">
        <Col sm={6}>
          {actions.create && <Button variant="primary" onClick={onAdd}><PlusSquare /></Button>}
        </Col>
        <Col sm={6}>
          <form onSubmit={handleSearchSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={handleSearchChange}
                value={searchText}
              />
              <InputGroup>
                <Button variant="outline-secondary" type="submit" disabled={isLoading}><Search /></Button>
              </InputGroup>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: `${column.width ? column.width * 100 / 12 : ""}%` }}>{column.title}</th>
            ))}
            {(actions.update || actions.delete || actions.view) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {columns.map((column, key) => (
                <td key={key}>
                  {column.render ? column.render(item) : String(item[column.field])}
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
}

export default GenericTable;

