json.blogs do
  json.array! @blogs do |blog|
    json.partial!(
      "api/blogs/blog",
      blog: blog,
      need_followStatus: true,
      followings_hash: @followings_hash,
      need_posts: false,
      need_followers: false,
      need_num_follows: false,
      need_num_posts: false
    )
    json.num_follows blog.num_followers
  end
end

json.total_count @blogs.total_count
json.total_pages @blogs.total_pages
