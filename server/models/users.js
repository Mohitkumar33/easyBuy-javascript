const mongoose = require('mongoose');

// Create a schema for the User model with timestamps
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  // Create the model using the schema
  const UserModel = mongoose.model('User', userSchema);
  
  // Export the User model so it can be used in other files
  module.exports = UserModel;