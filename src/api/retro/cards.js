// Store the database collection

import mongoose, { Schema } from 'mongoose';
// shape of data in database
export const CardsSchema = new Schema({
    statement: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // action: {
    //     type: Array,
    //     required: false
    // }
})

export default mongoose.models.cards || mongoose.model('cards', CardsSchema)