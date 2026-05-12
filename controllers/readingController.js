const MeterReading = require('../models/MeterReading');

exports.createReading = async (req, res) => {
  try {
    const reading = new MeterReading(req.body);
    const saved = await reading.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.getAllReadings = async (req, res) => {
  try {
    const readings = await MeterReading.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: readings.length, data: readings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getReadingsByUser = async (req, res) => {
  try {
    const readings = await MeterReading.find({ userId: req.params.userId }).sort({ month: -1 });
    if (readings.length === 0) {
      return res.status(404).json({ success: false, message: 'No readings found for this user' });
    }
    res.status(200).json({ success: true, count: readings.length, data: readings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getReadingById = async (req, res) => {
  try {
    const reading = await MeterReading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    res.status(200).json({ success: true, data: reading });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateReading = async (req, res) => {
  try {
    const reading = await MeterReading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ success: false, message: 'Reading not found' });
    }

    
    Object.assign(reading, req.body);


    reading.unitsConsumed = reading.currentUnits - reading.previousUnits;
    reading.estimatedBill = reading.unitsConsumed * reading.ratePerUnit;

    const updated = await reading.save();
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.deleteReading = async (req, res) => {
  try {
    const reading = await MeterReading.findByIdAndDelete(req.params.id);
    if (!reading) {
      return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    res.status(200).json({ success: true, message: 'Reading deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getUserSummary = async (req, res) => {
  try {
    const readings = await MeterReading.find({ userId: req.params.userId });
    if (readings.length === 0) {
      return res.status(404).json({ success: false, message: 'No data found for this user' });
    }

    const totalUnits = readings.reduce((sum, r) => sum + r.units, 0);
    const totalBill  = readings.reduce((sum, r) => sum + r.estimatedBill, 0);

    res.status(200).json({
      success: true,
      data: {
        userId: req.params.userId,
        totalReadings: readings.length,
        totalUnitsConsumed: totalUnits,
        totalEstimatedBill: totalBill,
        averageMonthlyUnits: (totalUnits / readings.length).toFixed(2),
        averageMonthlyBill:  (totalBill  / readings.length).toFixed(2)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};