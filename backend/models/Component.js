import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
  componentName: {
    type: String,
    required: true,
    unique: true,
  },
  componentHeading: {
    type: String,
    required: true,
  },
  installation: {
    type: String,
    required: true,
  },
  utilFile: {
    type: String, // URL or raw text
    required: false,
  },
  sourceCode: {
    type: String,
    required: true,
  },
  cli: {
    type: [String], // example: ["npm install", "npm run dev"]
    default: [],
  },
  previewVideo: {
    type: String, // video URL or file path
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Component || mongoose.model('Component', ComponentSchema);
