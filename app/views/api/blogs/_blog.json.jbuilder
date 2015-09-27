json.extract!(blog, :id, :title, :description, :url)
json.background_url asset_path(blog.background.url)

json.owner do
  json.partial!("api/users/user", user: blog.owner, need_followed_blogs: false)
end

json.num_follows blog.followers.to_a.count if need_num_follows
json.num_posts blog.posts.to_a.count if need_num_posts
json.following followings_hash[blog.id] if need_followStatus

if need_posts
  json.partial!("api/posts/posts", posts: posts)
end

if need_followers
  json.followers blog.followers.includes(:blog) do |follower|
    json.partial!("api/users/user", user: follower, need_followed_blogs: false)
    json.blog_url follower.blog.url
    json.following current_user.blog_follow_hash[follower.blog.id]
  end
end
