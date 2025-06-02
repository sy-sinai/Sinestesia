const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const { check } = require('express-validator');

router.get('/', musicController.getAllMusic);
router.get('/:id', musicController.getMusicById);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('artist', 'Artist is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
  ],
  musicController.createMusic
);

router.put(
  '/:id',
  [
    check('title', 'Title is required').optional().not().isEmpty(),
    check('artist', 'Artist is required').optional().not().isEmpty(),
    check('genre', 'Genre is required').optional().not().isEmpty(),
  ],
  musicController.updateMusic
);

router.delete('/:id', musicController.deleteMusic);

module.exports = router;
