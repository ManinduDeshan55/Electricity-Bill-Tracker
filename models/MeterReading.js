const mongoose = require('mongoose');

const meterReadingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true
  },
  month: {
    type: String,
    required: [true, 'Month is required'],
    match: [/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format']
  },
  previousUnits: {
    type: Number,
    required: [true, 'Previous meter reading is required'],
    min: 0
  },
  currentUnits: {
    type: Number,
    required: [true, 'Current meter reading is required'],
    min: 0
  },
  unitsConsumed: {
    type: Number
  },
  ratePerUnit: {
    type: Number,
    default: 10
},
  estimatedBill: {
    type: Number
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

meterReadingSchema.pre('save', async function () {
  this.unitsConsumed = this.currentUnits - this.previousUnits;
  this.estimatedBill = this.unitsConsumed * this.ratePerUnit;
});

module.exports = mongoose.model('MeterReading', meterReadingSchema);