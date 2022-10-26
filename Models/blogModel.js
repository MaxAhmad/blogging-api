const mongoose = require('mongoose');



const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: String,
        default: 1
    },
    read_count: {
        type: Number,
        default: 0
    },
    body: {
        type: String,
    }

},
{ timestamps: true }
);


const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog
