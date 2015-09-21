json.partial!("api/users/user", user: current_user, need_followed_blogs: true)

json.blog_id current_user.blog.id

json.feeds current_user.feeds do |feed|
  json.partial!(
    "api/posts/post",
    post: feed,
    need_likeStatus: true,
    likings_hash: current_user.post_likes_hash
  )
end

# json.recent_tags do
#   json.array! user.recent_tags do |tag|
#     json.extract!(tag, :id, :label, :post_id)
#   end
# end
