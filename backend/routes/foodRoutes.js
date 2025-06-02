const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController.js');
const { check } = require('express-validator');

router.get('/', foodController.getAllFood);
router.get('/:id', foodController.getFoodById);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price must be numeric').isNumeric(),
  ],
  foodController.createFood
);

router.put(
  '/:id',
  [
    check('name', 'Name is required').optional().not().isEmpty(),
    check('description', 'Description is required').optional().not().isEmpty(),
    check('price', 'Price must be numeric').optional().isNumeric(),
  ],
  foodController.updateFood
);

router.delete('/:id', foodController.deleteFood);

module.exports = router;
