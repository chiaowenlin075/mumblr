json.partial!(
  "api/blogs/blog",
  blog: @blog,
  posts: @posts,
  need_followStatus: true,
  followings_hash: @followings_hash,
  need_posts: true,
  need_followers: true,
  need_num_follows: true,
  need_num_posts: true,
)

json.total_count @posts.total_count
json.total_pages @posts.total_pages
