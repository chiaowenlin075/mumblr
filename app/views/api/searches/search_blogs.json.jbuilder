json.blogs do
  json.array! @blog_results do |blog|
    json.partial!(
      "api/blogs/blog",
      blog: blog,
      need_num_follows: true,
      need_followStatus: true,
      followings_hash: @followings_hash,
      need_posts: false,
      need_followers: false,
      need_num_posts: false
    )
  end
end
json.total_count @blog_results.total_count
json.total_pages @blog_results.total_pages
