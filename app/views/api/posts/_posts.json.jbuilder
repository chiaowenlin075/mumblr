json.posts posts do |post|
  json.partial!(
    "api/posts/post",
    post: post,
    need_likeStatus: true,
    likings_hash: current_user.post_likes_hash
  )
end

json.total_count posts.total_count
json.total_pages posts.total_pages
