json.extract!(blog, :id, :title, :description, :url)
json.background_url asset_path(blog.background.url)

json.owner do
  json.partial!("api/users/user", user: blog.owner, need_followed_blogs: false)
end

if need_posts
  json.posts posts do |post|
    json.partial!("api/posts/post", post: post)
  end
end

if need_followers
  json.follwers blog.followers do |follower|
    json.partial!("api/users/user", user: follower, need_followed_blogs: false)
  end
end
