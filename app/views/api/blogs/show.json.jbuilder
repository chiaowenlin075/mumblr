json.partial!(
  "api/blogs/blog",
  blog: @blog,
  posts: @posts,
  need_posts: true,
  need_followers: true
)
