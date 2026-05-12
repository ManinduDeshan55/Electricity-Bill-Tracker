const express = require('express');
const router = express.Router();

const {
  createReading,
  getAllReadings,
  getReadingsByUser,
  getReadingById,
  updateReading,
  deleteReading,
  getUserSummary
} = require('../controllers/readingController');

router.post('/',                          createReading);
router.get('/',                           getAllReadings);
router.get('/user/:userId',               getReadingsByUser);
router.get('/user/:userId/summary',       getUserSummary);
router.get('/:id',                        getReadingById);
router.put('/:id',                        updateReading);
router.delete('/:id',                     deleteReading);

module.exports = router;