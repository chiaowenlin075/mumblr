json.posts @feeds do |feed|
  json.partial!(
    "api/posts/post",
    post: feed,
    need_likeStatus: true,
    likings_hash: current_user.post_likes_hash
  )
end

json.total_count @feeds.total_count
json.total_pages @feeds.total_pages
