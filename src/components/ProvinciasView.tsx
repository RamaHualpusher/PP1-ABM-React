import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable from './GenericTable';
import ProvinciaService from '../services/ProvinciaService';
import { Provincia } from '../model/Provincia';

const ProvinciasView: React.FC = () => {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvincias = async () => {
      const data = await ProvinciaService.getProvincias();
      setProvincias(data);
    };

    fetchProvincias();
  }, []);

  const handleAdd = () => {
    navigate('/provincia/new');
  };

  const handleView = (provincia: Provincia) => {
    navigate(`/provincia/${provincia.id}`);
  };

  const handleEdit = (provincia: Provincia) => {
    navigate(`/provincia/${provincia.id}/edit`);
  };

  const handleDelete = async (provincia: Provincia) => {
    await ProvinciaService.deleteProvincia(provincia.id);
    setProvincias(provincias.filter(p => p.id !== provincia.id));
  };

  return (
    <GenericTable
      data={provincias}
      columns={[
        { field: 'nombre', title: 'Provincia' },
        { field: 'abreviatura', title: 'Abreviatura' },
        { field: 'bandera', title: 'Bandera', render: (row) => <img src={row.bandera} alt={row.nombre} /> },
      ]}
      actions={{
        create: true,
        view: true,
        update: true,
        delete: true,
      }}
      onAdd={handleAdd}
      onView={handleView}
      onUpdate={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default ProvinciasView;
