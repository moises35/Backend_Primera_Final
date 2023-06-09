const express = require('express');
const router = express.Router();
const consumicionDetalleController = require('./../controllers/consumicionDetalle.controllers');

router.get('/', consumicionDetalleController.getAllConsumicionDetalles);
router.get('/:consumicionId', consumicionDetalleController.getConsumicionDetallesByConsumicionId);
router.post('/', consumicionDetalleController.createConsumicionDetalle);

module.exports = router;