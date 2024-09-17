import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdatas',
        required: true,
    },
    categories:{
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
