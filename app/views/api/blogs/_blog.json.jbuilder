json.extract!(blog, :id, :title, :description, :url, :background_url)

json.owner do
  json.partial!("users/user", user: blog.owner)
end

json.posts blog.posts do |post|
  json.partial!("api/posts/post", post: post)
end
