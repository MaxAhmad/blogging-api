const Blog = require('./../Models/blogModel')


exports.createBlogPost = async (req, res) => {
    const body = req.body
    const blog = await Blog.create(body)
    res.status(201).json({
        status: 'success',
        data: {
            blog
        }
    })
}

exports.getBlogPost = async (req, res) => {
    try{
            const blog = await Blog.findById(req.params.id)
           //const blog = await Blog.findOne({ _id: req.params.id})
            res.status(200).json({
            status: 'success',
            data: {
                blog
            }
        })
    } catch(error){
        res.status(404).json({
            status: 'fail',
            message: error
          });
    }   
}

exports.getAllBlogPost = async (req, res) => {
    try{
        const blog = await Blog.find()
        res.status(200).jsom({
            status: "success",
            data: {
                blog
            }
        })
    } catch(error){
        res.status(404).json({
            status: 'fail',
            message: error
          });
    }   
}

exports.updateBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id)
       //const blog = await Blog.findOne({ _id: req.params.id})
        res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
    } catch(error){
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }   
}

exports.deleteBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndRemove(req.params.id)
       //const blog = await Blog.findOne({ _id: req.params.id})
        res.status(200).json({
        status: 'success',
        data: {
            blog: null
        }
    })
    } catch(error){
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }   
}