const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { check } = require('express-validator');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('releaseDate', 'Release date must be a valid date').isISO8601(),
  ],
  movieController.createMovie
);

router.put(
  '/:id',
  [
    check('title', 'Title is required').optional().not().isEmpty(),
    check('description', 'Description is required').optional().not().isEmpty(),
    check('releaseDate', 'Release date must be a valid date').optional().isISO8601(),
  ],
  movieController.updateMovie
);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;
