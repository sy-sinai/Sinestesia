const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController.js');
const { check } = require('express-validator');

// Ordena específicas primero
router.get('/myreviews', reviewController.getMyReviews);
router.get('/top/:type', reviewController.getTopItems);
router.get('/:id', reviewController.getReviewById); 

router.post(
  '/:type/:itemId',
  [
    check('rating', 'Rating is required and must be numeric').isNumeric(),
    check('comment', 'Comment is required').not().isEmpty(),
  ],
  reviewController.createReview
);

router.put(
  '/:id',
  [
    check('rating', 'Rating must be numeric').optional().isNumeric(),
    check('comment', 'Comment cannot be empty').optional().not().isEmpty(),
  ],
  reviewController.updateReview
);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;
