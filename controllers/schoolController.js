const School = require('../models/schoolModel');

// Add School Controller
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const schoolData = new School({ name, address, latitude, longitude });

  schoolData.save()
    .then((result) => {
      res.status(201).json({ message: 'School added successfully.', schoolId: result._id });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error adding school.', error: err.message });
    });
};

// List Schools Controller
exports.listSchools = (req, res) => {
  const { latitude: userLat, longitude: userLng } = req.query;

  if (!userLat || !userLng || isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ message: 'Latitude and Longitude are required as query parameters.' });
  }

  School.find()
    .then((schools) => {
      const schoolsWithDistances = schools.map((school) => {
        const distance = calculateDistance(
          parseFloat(userLat),
          parseFloat(userLng),
          school.latitude,
          school.longitude
        );
        return { ...school.toObject(), distance };
      });

      schoolsWithDistances.sort((a, b) => a.distance - b.distance);
      res.status(200).json({ schools: schoolsWithDistances });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching schools.', error: err.message });
    });
};

// Get All Schools Controller
exports.getAllSchools = (req, res) => {
  School.find()
    .then((schools) => {
      res.status(200).json({ schools });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching schools.', error: err.message });
    });
};

// Helper function for Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (degree) => (degree * Math.PI) / 180;

  const R = 6371; // Radius of Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};
