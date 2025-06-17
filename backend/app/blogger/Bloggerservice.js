import BloggerModal from "../blogger/modals/Blogger.js";
import UserModal from "../user/modals/User.js";
import { ROLE } from "../enums/role.js";
import slugify from "slugify";

//genetrating unique slung
const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await BloggerModal.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
};

//Using-(POST)
export const createBlog = async (req, res) => {
  try {
    const userId = req.userId;

    //check if user is author
    const user = await UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== ROLE.AUTHOR) {
      return res.status(403).json({ message: "Only authors can create blogs" });
    }

    const { title, content, images, category, isPublished, publishedAt } =
      req.body;

    const generatedSlug = await generateUniqueSlug(title);
    console.log(generatedSlug);

    const newBlog = new BloggerModal({
      title,
      slug: generatedSlug,
      content,
      images,
      author: userId,
      category,
      isPublished,
      publishedAt: isPublished ? publishedAt || new Date() : null,
    });
    await newBlog.save();

    return newBlog;
  } catch (error) {
    console.log({ error });

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Using-(GET)Allblog
export const getAllBlog = async () => {
  try {
    const aggregatestage = [
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "blog",
          as: "likes",
        },
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];

    const blogs = await BloggerModal.aggregate(aggregatestage);

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return blogs;
  } catch (error) {
    throw error;
  }
};

//Using-(GET)byId
export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);

    const blog = await BloggerModal.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    throw error;
  }
};

//Using-(PUT)updatebyid
export const updateBlogById = async (id, body, updatedBy) => {
  try {
    const updatedBlog = await BloggerModal.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: Date.now(),
        updatedBy,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      throw new Error("Blog not found");
    }
    return updatedBlog;
  } catch (error) {
    throw error;
  }
};

// Using-Patch(softDelte)
export const softDeleteById = async (id, deletedBy) => {
  try {
    const blog = await BloggerModal.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: Date.now(),
        deletedBy,
        isActive: false,
      },
      { new: true }
    );
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (error) {
    throw error;
  }
};

//Using-Get(Search)
export const searchBlogs = async (keyword) => {
  try {
    const regex = new RegExp(keyword, "i");

    const blogs = await BloggerModal.find({
      isDeleted: { $ne: true },
      $or: [
        {
          title: regex,
        },
        {
          content: regex,
        },
        {
          category: regex,
        },
      ],
    }).sort({ createdAt: -1 });

    const trimmedBlogs = blogs.map((blog) => ({
      ...blog.toObject(),
      content:
        blog.content.slice(0, 100) + (blog.content.length > 100 ? "..." : ""),
    }));
    return trimmedBlogs;
  } catch (error) {
    throw error;
  }
};
