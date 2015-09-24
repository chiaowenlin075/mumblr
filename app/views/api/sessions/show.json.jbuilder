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

if @liked_posts
  json.liked_posts @liked_posts.includes(:author, :likings, :taggings) do |post|
    json.partial!(
      "api/posts/post",
      post: post,
      need_likeStatus: true,
      likings_hash: current_user.post_likes_hash
    )
  end
end

json.recent_tags current_user.recent_tags
