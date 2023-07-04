import Post from "../models/postModel.js";
import catchAsyncFn from "../utils/catchAsyncFn.js";
import AppError from "../utils/AppError.js";

//

export const createPost = catchAsyncFn(async (req, res) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({ status: "success", data: newPost });
});

//

export const getPosts = catchAsyncFn(async (req, res, next) => {
  let queryObj = { ...req.query };
  const filterQuery = ["fields", "sort", "page", "limit"];
  filterQuery.forEach((el) => delete queryObj[el]);

  const posts = await Post.find(queryObj);

  res.status(200).json({
    status: "success",
    results: posts.length,
    data:
      posts.length === 0 ? "there's no post available at this point" : posts,
  });
});

//

export const deletePost = catchAsyncFn(async (req, res, next) => {
  const doc = await Post.findByIdAndDelete(req.params.postId);
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
  });
});

//

export const updatePost = catchAsyncFn(async (req, res, next) => {
  const updatedDoc = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedDoc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({ status: "success", updatedDoc });
});
