const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, 'Token is required to be added to the blacklist'],
  },
},{
    timestamps: true
})

const tokenBlacklistModel = mongoose.model('token_blacklist', blacklistSchema);
module.exports = tokenBlacklistModel;