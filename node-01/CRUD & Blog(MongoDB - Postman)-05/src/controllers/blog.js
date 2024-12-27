const Blog = require("../models/blog");

const getBlog = async (req,res) => {
    const allBlogs = await Blog.find();

    res.json({
        blogs : allBlogs,
    });
};

const createBlog = (req,res) => {
    const {title,content,tags} = req.body;

    Blog.create({title,content,tags});

    res.json({
        msg : "Blog is Created",
    });
};

module.exports = {getBlog,createBlog};