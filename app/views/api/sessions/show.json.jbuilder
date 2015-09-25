json.partial!("api/users/user", user: current_user, need_followed_blogs: true)

json.blog_id current_user.blog.id

json.feeds @feeds do |feed|
  json.partial!(
    "api/posts/post",
    post: feed,
    need_likeStatus: true,
    likings_hash: current_user.post_likes_hash
  )
end

json.feed_total_count @feeds.total_count
json.feed_total_pages @feeds.total_pages

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

json.liked_posts_total_count @liked_posts.total_count
json.liked_posts_total_pages @liked_posts.total_pages

json.recent_tags current_user.recent_tags
