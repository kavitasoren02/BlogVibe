import mongoose from "mongoose";
import slugify from 'slugify';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      default: null,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,  
    },

    deletedAt: {
      type: Date, 
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,  
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,  
    },
  },
  {
    timestamps: true,
  }
);


const BloggerModal = mongoose.model("Blogger", BlogSchema);

export default BloggerModal;
