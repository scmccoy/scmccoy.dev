// Store the database collection
// SCHEMA
import mongoose, { Schema } from 'mongoose';
// shape of data in database
export const CardSchema = new Schema({
  statement: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  actionItems: {
    type: Array,
    required: false,
  },
  voteTallyUp: {
    type: Number,
    required: false,
  },
  voteTallyDown: {
    type: Number,
    required: false,
  }
});

export default mongoose.models.cards || mongoose.model('cards', CardSchema);
