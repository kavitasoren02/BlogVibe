//Auth
export const LOGIN_ENDPOINT = '/auth/login'
export const GET_USER_INFO = 'auth/info'
export const LOGOUT = '/auth/logout'

//Admin
export const GET_ADMIN_STATUS = "/dashboard/admin";
export const GET_RECENT_BLOGS = "/author/getallblogs";

//Bloggers
export const GET_BLOGGERS = '/user/bloggers'
export const GET_COUNTS ='/dashboard/blogger'
export const GET_OWN_BLOGS = (userId) => `/author/ownblogs/${userId}`;
export const UPDATE_BLOGGERS =(bloggerId) => `/user/${bloggerId}`

//Users
export const GET_USER = '/user'
export const UPDATE_USERS =(userId) => `/user/${userId}`


//Images
export const IMAGE_UPLOAD = "/file/upload";
export const GET_ALL_IMAGE = "/file/getImage";

//Comments
export const CREATE_COMMENTS = "/blogs/comment";
export const GET_BLOG_COMMENTS = (blogId) => `/blogs/getcomment/${blogId}`;

//Likes
export const CREATE_LIKES = "/like/createlike";

// Blogs
export const CREATE_BLOGS = "/author/createblog";
export const GET_ALL_BLOGS = "/author/allblogs";
export const DELETE_BLOGS = (id) => `/author/softdelete/${id}`
export const UPDATE_BLOGS = (id) => `/author/updateblog/${id}`
export const GET_BLOG_BYID = (id) => `/author/getblog/${id}` 