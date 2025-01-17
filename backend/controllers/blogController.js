import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from '../middleware/error.js';
import {Blog} from '../models/blogSchema.js';
import cloudinary from 'cloudinary';

export const blogPost = catchAsyncErrors( async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Blog Main Image is Mandatory!", 400));
    }

    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage} = req.files;
    if(!mainImage){
        return next(new ErrorHandler("Main Image is Mandatory!", 400));
    }

    const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
    if( !allowedFormats.includes(mainImage.mimetype) || (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))) {
        return next(new ErrorHandler("Invalid file type of image. Only jpg, png or webp file type is allowed.", 400));
    }

    const {title, intro, paraOneDescription, paraOneTitle, paraTwoDescription, paraTwoTitle, paraThreeDescription, paraThreeTitle, category, published} = req.body;

    const createdBy = req.user._id;
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar.url;

    if(!title || !category || !intro){
        return next(new ErrorHandler("Title, Intro and Category are Required fields!", 400));
    }

    const uploadPromises = [
        cloudinary.uploader.upload(mainImage.tempFilePath),
        paraOneImage ? cloudinary.uploader.upload(paraOneImage.tempFilePath) : Promise.resolve(null),
        paraTwoImage ? cloudinary.uploader.upload(paraTwoImage.tempFilePath) : Promise.resolve(null),
        paraThreeImage ? cloudinary.uploader.upload(paraThreeImage.tempFilePath) : Promise.resolve(null),
    ];

    const [mainImageRes, paraOneImageRes, paraTwoImageRes, paraThreeImageRes ] = await Promise.all(uploadPromises);

    if(!mainImageRes || mainImageRes.error || (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) || (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error)) || (paraThreeImage && (!paraThreeImageRes || paraThreeImageRes.error))) {
        return next(new ErrorHandler("Error occurs while uploading one or more Images!", 500));
    }
    const blogData = {
        title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        category,
        createdBy,
        published,
        authorAvatar,
        authorName,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url,
        },
    }

    if(paraOneImageRes){
        blogData.paraOneImage = {
            public_id: paraOneImageRes.public_id,
            url: paraOneImageRes.secure_url,
        }
    }
    if(paraTwoImageRes){
        blogData.paraTwoImage = {
            public_id: paraTwoImageRes.public_id,
            url: paraTwoImageRes.secure_url,
        }
    }
    if(paraThreeImageRes){
        blogData.paraThreeImage = {
            public_id: paraThreeImageRes.public_id,
            url: paraThreeImageRes.secure_url,
        }
    }

    const blog = await Blog.create(blogData);
    res.status(200).json({
        success: true,
        message: "Blog Uploaded!",
        blog,
    })

});


export const deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found!", 404));
    }
    await blog.deleteOne();
    res.status(200).json({
        success: true,
        message: "Blog deleted",
    });
});

export const getAllBlogs = catchAsyncErrors(async (req, res, next) => {
    const allBlogs = await Blog.find({published: true});
    res.status(200).json({
        success: true,
        allBlogs,
    })
})

export const getSingleBlog = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found!", 400));
    }
    res.status(200).json({
        success: true,
        blog,
    })
})

export const getMyBlogs = catchAsyncErrors(async(req, res, next) => {
    const createdBy = req.user._id;
    const blogs = await Blog.find({ createdBy });
    res.status(200).json({
        success: true,
        blogs
    })
});

export const updateBlogs = catchAsyncErrors(async(req, res, next) => {
    const {id} = req.params;
    let blog = await Blog.findById(id);
    if(!blog){
        return next(new ErrorHandler("Blog not found!", 404));
    }
    
    const newBlogData = {
        title: req.body.title,
        intro: req.body.intro,
        category: req.body.category,
        paraOneTitle: req.body.paraOneTitle,
        paraOneDescription: req.body.paraOneDescription,
        paraTwoTitle: req.body.paraTwoTitle,
        paraTwoDescription: req.body.paraTwoDescription,
        paraThreeTitle: req.body.paraThreeTitle,
        paraThreeDescription: req.body.paraThreeDescription,
        published: req.body.published
    }
    if(req.files){
        const {mainImage, paraOneImage, paraTwoImage, paraThreeImage} = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if((mainImage && !allowedFormats.includes(mainImage.mimetype)) || (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) || (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) || (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))){
            return next(new ErrorHandler("invalid image format!, only jpg, png and webp formats are allowed.",400))
        }
        if(req.files && mainImage){
        const blogMainImageId = blog.mainImage.public_id;
        await cloudinary.uploader.destroy(blogMainImageId);
        const newBlogMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath
        );
        newBlogData.mainImage = {
            public_id: newBlogMainImage.public_id,
            url: newBlogMainImage.secure_url,
        }
    }

    if(req.files && paraOneImage){
        if(blog.paraOneImage){
            const blogParaOneImageId = blog.paraOneImage.public_id;
            await cloudinary.uploader.destroy(blogParaOneImageId);
        }
        const newBlogParaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath);
        newBlogData.paraOneImage = {
            public_id: newBlogParaOneImage.public_id,
            url: newBlogParaOneImage.secure_url,
        }
    }

    if(req.files && paraTwoImage){
        if(blog.paraTwoImage){
            const blogParaTwoImageId = blog.paraTwoImage.public_id;
            await cloudinary.uploader.destroy(blogParaTwoImageId);
        }
        const newBlogParaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath);
        newBlogData.paraTwoImage = {
            public_id: newBlogParaTwoImage.public_id,
            url: newBlogParaTwoImage.secure_url,
        }
    }

    if(req.files && paraThreeImage){
        if(blog.paraThreeImage){
            const blogParaThreeImageId = blog.paraThreeImage.public_id;
            await cloudinary.uploader.destroy(blogParaThreeImageId);
        }
        const newBlogParaThreeImage = await cloudinary.uploader.upload(paraThreeImage.tempFilePath);
        newBlogData.paraThreeImage = {
            public_id: newBlogParaThreeImage.public_id,
            url: newBlogParaThreeImage.secure_url,
        }
    }
    }

    blog = await Blog.findByIdAndUpdate(id, newBlogData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        message: "Blog updated!",
        blog,
    })
})
