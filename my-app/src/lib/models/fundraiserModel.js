import mongoose from "mongoose"

const fundraiserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizationdatas',
        required: true,
    },
    location:{
        type:String,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    goal: {
        type: Number,
        required: true,
    },
    raised: {
        type: Number,
        default: 0,
    },
    category:{
        type: String,
        required: true,
    }
});

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);
module.exports = Fundraiser;
