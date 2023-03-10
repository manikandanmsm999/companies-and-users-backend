const express=require('express');

const routing=express.Router();
const servicesCompany=require('../Controller/servicesCompany');
const servicesUser=require('../Controller/servicesUser');
const services=require('../Controller/services');
const servicesMap=require('../Controller/servicesMap');

routing.get('/map/getCoordinates/:address',servicesMap.getCoordinates);
routing.all('/map/getCoordinates/*',servicesMap.mapInvalid);

routing.get('/companies/getCompanies',servicesCompany.getCompanies);
routing.get('/users/getUsers',servicesUser.getUsers);

routing.get('/companies/getCompanyById/:companyId',servicesCompany.getCompanyById);
routing.get('/users/getUserById/:userId',servicesUser.getUsersById);

routing.post('/companies/createCompany',servicesCompany.createCompany);
routing.post('/users/createUser',servicesUser.createUser);
routing.post('/companies/addUserToCompany',servicesCompany.addUserToCompany);


routing.put('/companies/updateCompany',servicesCompany.updateCompany);
routing.put('/users/updateUser',servicesUser.updateUser);
routing.put('/users/deactivateUser/:userId',servicesUser.deactivateUser);

routing.delete('/companies/deleteCompany/:companyId',servicesCompany.deleteCompany);
routing.delete('/users/deleteUser/:userId',servicesUser.deleteUser);
routing.delete('/companies/removeUserFromCompany/:companyId/:userId',servicesCompany.removeUserFromCompany);

routing.all('*',services.invalid);

module.exports=routing;





