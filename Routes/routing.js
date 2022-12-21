const express=require('express');

const routing=express.Router();
const servicesCompany=require('../Controller/servicesCompany');
const servicesUser=require('../Controller/servicesUser');
const services=require('../Controller/services');

routing.get('/companies/getCompanies',servicesCompany.getCompanies);
routing.get('/users/getUsers',servicesUser.getUsers);

routing.get('/companies/getCompanyById/:companyId',servicesCompany.getCompanyById);
routing.get('/users/getUserById/:userId',servicesUser.getUsersById);

routing.post('/companies/createCompany',servicesCompany.createCompany);
routing.post('/users/createUser',servicesUser.createUser);

routing.put('/companies/updateCompany',servicesCompany.updateCompany);
routing.put('/users/updateUser',servicesUser.updateUser);
routing.put('/users/deactivateUser',servicesUser.deactivateUser);

routing.delete('/companies/deleteCompany/:companyId',servicesCompany.deleteCompany);
routing.delete('/users/deleteUser/:userId',servicesUser.deleteUser);

routing.all('*',services.invalid);

module.exports=routing;





