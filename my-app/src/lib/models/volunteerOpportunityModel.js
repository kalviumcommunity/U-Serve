import mongoose from "mongoose"

const volunteerOpportunitySchema = new mongoose.Schema({
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
    location: {
        type: String
    },
    date: {
        type: Date
    },
    duration:{
        type: String
    },
    availability: {
        type: String,
        enum: ['Live', 'Completed', 'Upcoming'], 
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
});

const VolunteerOpportunity = mongoose.model('VolunteerOpportunity', volunteerOpportunitySchema);
module.exports = VolunteerOpportunity;
