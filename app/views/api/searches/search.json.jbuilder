json.blogs @blog_results do |blog|
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

json.posts @post_results do |post|
  json.partial!(
    "api/posts/post",
    post: post,
    need_likeStatus: true,
    likings_hash: @likings_hash
  )
end
