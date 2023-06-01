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

  const provincias = [
    { nombre: 'Buenos Aires', bandera: 'public/img/buenos-aires.png' },
    { nombre: 'CABA', bandera: 'public/img/provincia-buenos-aires.png' },
    { nombre: 'Catamarca', bandera: 'public/img/catamarca.png' },
    { nombre: 'Chaco', bandera: 'public/img/chaco.png' },
    { nombre: 'Chubut', bandera: 'public/img/chubut.png' },
    { nombre: 'Córdoba', bandera: 'public/img/cordoba.png' },
    { nombre: 'Corrientes', bandera: 'public/img/corrientes.png' },
    { nombre: 'Entre Ríos', bandera: 'public/img/entre-rios.png' },
    { nombre: 'Formosa', bandera: 'public/img/formosa.png' },
    { nombre: 'Jujuy', bandera: 'public/img/jujuy.png' },
    { nombre: 'La Pampa', bandera: 'public/img/la-pampa.png' },
    { nombre: 'La Rioja', bandera: 'public/img/la-rioja.png' },
    { nombre: 'Mendoza', bandera: 'public/img/mendoza.png' },
    { nombre: 'Misiones', bandera: 'public/img/misiones.png' },
    { nombre: 'Neuquén', bandera: 'public/img/neuquen.png' },
    { nombre: 'Tierra del Fuego', bandera: 'public/img/tierra-del-fuego.png' },
  ];
  

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
        <Form.Control as="select" name="bandera" value={provincia.bandera} onChange={handleChange}>
          {provincias.map((p, index) => (
            <option key={index} value={p.bandera}>
              {p.nombre}
            </option>
          ))}
        </Form.Control>
        {provincia.bandera && (
          <div>
            <img src={provincia.bandera} alt={provincia.nombre} style={{ width: "25px" }} />
            {provincia.nombre}
          </div>
        )}
      </Form.Group>
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
