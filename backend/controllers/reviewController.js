const Review = require('../models/review');
const Movie = require('../models/movie');
const Music = require('../models/music');
const Food = require('../models/food');

exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getMyReviews = async (req, res) => {
  try {
    // Aquí puedes filtrar por usuario si tienes autenticación, por ahora devuelve todas las reseñas
    const reviews = await Review.find().populate('user');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user');
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCrossRecommendations = async (req, res) => {
  try {
    const { type, itemId } = req.params;
    let recommendations = {};

    if (type === 'Película') {
      const movie = await Movie.findById(itemId);
      if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

      const music = await Music.find({ genre: movie.genre }).limit(5);
      const food = await Food.find({ countryOfOrigin: movie.countryOfOrigin }).limit(5);
      recommendations = { music, food };
    } else if (type === 'Música') {
      const music = await Music.findById(itemId);
      if (!music) return res.status(404).json({ message: 'Música no encontrada' });

      const movies = await Movie.find({ genre: music.genre }).limit(5);
      const food = await Food.find({ countryOfOrigin: music.countryOfOrigin }).limit(5);
      recommendations = { movies, food };
    } else if (type === 'Comida') {
      const food = await Food.findById(itemId);
      if (!food) return res.status(404).json({ message: 'Comida no encontrada' });

      const movies = await Movie.find({ countryOfOrigin: food.countryOfOrigin }).limit(5);
      const music = await Music.find({ countryOfOrigin: food.countryOfOrigin }).limit(5);
      recommendations = { movies, music };
    } else {
      return res.status(400).json({ message: 'Tipo no válido' });
    }

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopItems = async (req, res) => {
  try {
    const { type } = req.params; // 'Película', 'Música', 'Comida'
    const { startDate, endDate, limit = 5 } = req.query;

    const matchStage = { type };

    if (startDate && endDate) {
      matchStage.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const topItems = await Review.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$item',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1, reviewCount: -1 },
      },
      { $limit: parseInt(limit) },
    ]);

    let populatedResults = [];

    if (type === 'Película') {
      populatedResults = await Promise.all(
        topItems.map(async (item) => {
          const movie = await Movie.findById(item._id);
          return {
            itemDetails: movie,
            averageRating: item.averageRating,
            reviewCount: item.reviewCount,
          };
        })
      );
    } else if (type === 'Música') {
      populatedResults = await Promise.all(
        topItems.map(async (item) => {
          const music = await Music.findById(item._id);
          return {
            itemDetails: music,
            averageRating: item.averageRating,
            reviewCount: item.reviewCount,
          };
        })
      );
    } else if (type === 'Comida') {
      populatedResults = await Promise.all(
        topItems.map(async (item) => {
          const food = await Food.findById(item._id);
          return {
            itemDetails: food,
            averageRating: item.averageRating,
            reviewCount: item.reviewCount,
          };
        })
      );
    } else {
      return res.status(400).json({ message: 'Tipo no válido' });
    }

    res.json(populatedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
