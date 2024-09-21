const mongoose = require('mongoose');

const HealthInfoSchema = new mongoose.Schema({
  bmi: { type: Number, required: true },
  hypertension: { type: String, required: true },
  smokingHistory: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  glucoseLevel: { type: Number, required: true },
  hasSeriousDiagnosis: { type: Boolean, default: false }, // No 'required' here
});

const HealthInfo = mongoose.model('HealthInfo', HealthInfoSchema);

module.exports = HealthInfo;
