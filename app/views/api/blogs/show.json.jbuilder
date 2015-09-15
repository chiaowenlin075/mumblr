json.extract!(@blog, :id, :title, :owner_id, :description, :url, :background_url)

json.posts @blog.posts do |post|
  json.partial!("api/posts/post", post: post)
end
