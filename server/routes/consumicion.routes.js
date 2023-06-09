const express = require('express');
const router = express.Router();
const consumicionController = require('./../controllers/consumicion.controllers');

router.get('/', consumicionController.getAllConsumiciones);
router.get('/:tableId', consumicionController.getConsumicionesByTableId);
router.put('/close/:consumicionId', consumicionController.closeConsumicion);       // total, closedAt
router.post('/', consumicionController.createConsumicion);
router.put('/:consumicionId', consumicionController.updateClient);
router.delete('/:consumicionId', consumicionController.deleteConsumicion);

module.exports = router;