const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organisationdatas',
        required: true,
    },
    goalAmount: {
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        default: 0,
    },
});

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);
module.exports = Fundraiser;
