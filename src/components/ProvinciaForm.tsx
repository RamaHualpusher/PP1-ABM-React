import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import ProvinciaService from '../services/ProvinciaService';
import { Provincia } from '../model/Provincia';

interface RouteParams {
  id?: string;
}

const ProvinciaForm: React.FC = () => {
  const [provincia, setProvincia] = useState<Provincia | null>(null);
  const { id } = useParams<Record<string, string | undefined>>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvincia = async () => {
      if (id) {
        const data = await ProvinciaService.getProvincia(Number(id));
        setProvincia(data);
      } else {
        setProvincia({
          id: 0,
          nombre: '',
          capital: '',
          poblacion: 0,
          superficie: 0,
          nroDepartamentos: 0,
          abreviatura: '',
          bandera: '',
        });
      }
    };

    fetchProvincia();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProvincia({ ...provincia!, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (provincia) {
      if (provincia.id === 0) {
        await ProvinciaService.postProvincia(provincia);
      } else {
        await ProvinciaService.putProvincia(provincia);
      }
      navigate('/provincia');
    }
  };

  const handleCancel = () => {
    navigate('/provincia');
  };


  if (!provincia) return <div>Loading...</div>;

  return (
    <div className='container m-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={provincia.nombre} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="capital">
          <Form.Label>Capital</Form.Label>
          <Form.Control type="text" name="capital" value={provincia.capital} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="poblacion">
      <Form.Label>Población</Form.Label>
          <Form.Control 
              type="number"
              name="poblacion"
              value={provincia.poblacion}
              onChange={handleChange}
          />
      </Form.Group>
      <Form.Group controlId="superficie">
          <Form.Label>Superficie</Form.Label>
          <Form.Control
              type="number"
              name="superficie"
              value={provincia.superficie}
              onChange={handleChange}
          />
      </Form.Group>

      <Form.Group controlId="nroDepartamentos">
          <Form.Label>Número de Departamentos</Form.Label>
          <Form.Control
              type="number"
              name="nroDepartamentos"
              value={provincia.nroDepartamentos}
              onChange={handleChange}
          />
      </Form.Group>

      <Form.Group controlId="abreviatura">
          <Form.Label>Abreviatura</Form.Label>
          <Form.Control
              type="text"
              name="abreviatura"
              value={provincia.abreviatura}
              onChange={handleChange}
          />
      </Form.Group>

      <Form.Group controlId="bandera">
          <Form.Label>Bandera</Form.Label>
          <Form.Control
              type="text"
              name="bandera"
              value={provincia.bandera}
              onChange={handleChange}
          />
      </Form.Group>

      

        {/* Repite el patrón de Form.Group para cada campo que necesites */}
        <Button variant="primary" type="submit" className='mx-2'>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="mx-2">
          Cancelar
        </Button>
      </Form>
    </div>
  );
};

export default ProvinciaForm;
