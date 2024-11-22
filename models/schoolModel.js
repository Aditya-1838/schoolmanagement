const mongoose = require('mongoose');

// Define the School schema
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
;

/* MySQL code (commented out for reference)
const db = require('../config/db');

// Add a new school
exports.addSchool = (schoolData, callback) => {
  const sql = 'INSERT INTO schools SET ?';
  db.query(sql, schoolData, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Fetch all schools
exports.getAllSchools = (callback) => {
  const sql = 'SELECT * FROM schools';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
*/
