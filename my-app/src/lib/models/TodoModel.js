const mongoose = require('mongoose');
const Joi = require('joi');

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
});

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
});

const volunteerOpportunitySchema = new mongoose.Schema({
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
    location: {
        type: String,
    },
    date: {
        type: Date,
    },
});

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

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdatas',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("userdatas", userSchema);
const Organisation = mongoose.model("organisationdatas", organisationSchema);
const VolunteerOpportunity = mongoose.model("volunteeropportunitydatas", volunteerOpportunitySchema);
const Fundraiser = mongoose.model("fundraiserdatas", fundraiserSchema);
const Feedback = mongoose.model("feedbackdatas", feedbackSchema);

const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const organisationValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.string().uri(),
});

const volunteerOpportunityValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    organisation: Joi.string().required(),
    location: Joi.string(),
    date: Joi.date(),
});

const fundraiserValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    organisation: Joi.string().required(),
    goalAmount: Joi.number().required(),
    currentAmount: Joi.number(),
});

const feedbackValidationSchema = Joi.object({
    user: Joi.string().required(),
    message: Joi.string().required(),
    rating: Joi.number().required(),
});

// Validation functions
function validateUser(user) {
    return userValidationSchema.validate(user);
}

function validateOrganisation(org) {
    return organisationValidationSchema.validate(org);
}

function validateVolunteerOpportunity(opportunity) {
    return volunteerOpportunityValidationSchema.validate(opportunity);
}

function validateFundraiser(fundraiser) {
    return fundraiserValidationSchema.validate(fundraiser);
}

function validateFeedback(feedback) {
    return feedbackValidationSchema.validate(feedback);
}

module.exports = {
    User, Organisation, VolunteerOpportunity, Fundraiser, Feedback,
    validateUser, validateOrganisation, validateVolunteerOpportunity, validateFundraiser, validateFeedback
};
