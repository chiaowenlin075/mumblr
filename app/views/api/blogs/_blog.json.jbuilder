json.extract!(blog, :id, :title, :description, :url)
json.background_url blog.background.url

json.owner do
  json.partial!("api/users/user", user: blog.owner)
end

json.posts blog.posts do |post|
  json.partial!("api/posts/post", post: post)
end
