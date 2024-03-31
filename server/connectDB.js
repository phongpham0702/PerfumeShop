const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/PerfumeStore', {
      connectTimeoutMS: 200000,
    });
    console.log('Connect database successfully');
  } catch (error) {
    console.log('Connect database failure');
  }
}

module.exports = { connect };
