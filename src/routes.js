import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Proprietario = React.lazy(() => import('./views/Cadastros/Proprietario/Proprietario'));
const AnimalInserir = React.lazy(() => import('./views/Cadastros/Animal/AnimalInserir'));
const AnimalEditar = React.lazy(() => import('./views/Cadastros/Animal/AnimalEditar'));
const Comunicados = React.lazy(() => import('./views/Cadastros/Animal/Comunicados'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Login' },
  { path: '/app', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/app/proprietario', name: 'Proprietario', component: Proprietario },
  { path: '/app/animal/insert', name: 'AnimalInserir', component: AnimalInserir },
  { path: '/app/animal/edit/:id', name: 'AnimalEditar', component: AnimalEditar },
  { path: '/app/animal/comunicados/:id', name: 'Comunicados', component: Comunicados }
];

export default routes;
