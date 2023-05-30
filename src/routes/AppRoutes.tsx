// AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProvinciaDetail from '../components/ProvinciaDetail';
import ProvinciaForm from '../components/ProvinciaForm';
import ProvinciasView from '../components/ProvinciasView';
import Home from '../components/Home';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/provincia" element={<ProvinciasView />} />
      <Route path="/provincia/:id" element={<ProvinciaDetail />} />
      <Route path="/provincia/:id/edit" element={<ProvinciaForm />} />
      <Route path="/provincia/new" element={<ProvinciaForm />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
