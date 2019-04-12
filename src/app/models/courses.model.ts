import mongoose from 'mongoose';
import AuthorModel from "./author.model";

const courseSchema: any = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Author',
        required: true
    },
    collaborators: [AuthorModel.schema],
    category: {
        type: String,
        required: true,
        enum: ['backend','frontend','fullstack'],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value: any[], callback: (result: boolean) => void) {
                setTimeout(() => {
                    // do async work
                    const result = value && value.length > 0;
                    callback(result);
                },0);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: function () {
            console.log(this.isPublished);
            return this.isPublished
        },
        min: 10,
        max: 200,
        get: (value: number) => {
            return Math.round(value);
        },
        set: (value: number) => {
            return Math.round(value);
        }
    }
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;