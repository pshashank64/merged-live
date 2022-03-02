const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Teacher'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    imageURl: {
        type: String
    },
    videoUrl: {
        type: String
    },
    meetURL: {
        type: String,
    },
    date: {
        type: Date
    },
    time: {
        type: String
    }
}, {
    timestamps: true
});

const Live = mongoose.model("Live",liveSchema);

module.exports = Live;