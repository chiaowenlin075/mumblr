json.posts posts.to_a.reverse! do |post|
  likings_hash = current_user.nil? ? {} : current_user.post_likes_hash
  json.partial!(
    "api/posts/post",
    post: post,
    need_likeStatus: true,
    likings_hash: likings_hash
  )
end

json.total_count posts.total_count
json.total_pages posts.total_pages
