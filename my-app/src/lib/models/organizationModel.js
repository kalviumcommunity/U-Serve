import mongoose from "mongoose"

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
});
const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
