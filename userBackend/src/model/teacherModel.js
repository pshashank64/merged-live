const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        unique: true
    },
    date_time : {
        type: Number,
        default: Date.now()
    },
    courses_taken: {
        type: Number
    },
    qualifications: {
        type: String
    },
    tokens: [
        {
            token: {
            type: String,
            required: true,
            },
            timestamp: {type: Number, required: true, integer: true, default: Date.now()},
        },
    ],
});

teacherSchema.methods.genAuthToken = async function () {
    const teacher = this;
    const token = jwt.sign({ _id: teacher._id.toString() }, process.env.SECRET_KEY);
    teacher.tokens = teacher.tokens.concat({ token });
    await teacher.save();
  
    return token;
};
teacherSchema.methods.toJSON = function () {
    const teacher = this;
    const teacherObject = teacher.toObject();

    delete teacherObject.tokens;
    delete teacherObject.password;

    return teacherObject;
};

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;