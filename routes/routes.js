const express = require('express');
const router = express.Router();

const getindicesData = require('../controllers/getIndexdata');
const insertApi = require('../controllers/registration');
const updateApi = require('../controllers/userdetailsupdate');
const deleteApi = require('../controllers/deleteuserdetails');

// Connection test
router.get('/',  (req, res) => {
   res.send({
      status:200,
      message:'YOU ARE CONNECTED TO SERVER VIA API'
   });
});


// Get elastic indices data 
router.get('/find/all/:index', (req, res) => { 
   getindicesData.getEachIndicesData(req, res);
});

// Get single elastic indices data 
router.post('/find/single/data', (req, res) => { 
   getindicesData.getEachIndicesSingleRecord(req, res);
});

// Get repeated field data from the indices => comets
router.get('/find/repeated/data', (req, res) => {
   getindicesData.getRepeatedFieldIndicesData(req, res);
});

// Insert single data into Elastic-search directly => indices comets
router.post('/insert/single/data', (req, res) => { 
   insertApi.insertSingleData(req, res);
});

// Update single data into Elastic-search => indices comets
router.put('/update/user/data', (req, res) => { 
   updateApi.updateSingleData(req, res);
});

// Delete single data from Elastic-search => indices comets
router.delete('/delete/user/data', (req, res) => {  
   deleteApi.deleteUserData(req, res);
});

// Delete indices from Elastic-search => indices comets
router.delete('/delete/:index', (req, res) => {
   deleteApi.deleteElasticSearchIndex(req, res);
});




module.exports = router;