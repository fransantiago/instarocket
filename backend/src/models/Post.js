const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    autoIndex: false, // It fixes deprecation warning: "collection.ensureIndex is deprecated."
  },
);

module.exports = mongoose.model('Post', PostSchema);
