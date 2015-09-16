json.extract!(post, :id, :blog_id, :post_type,
              :num_likes, :title, :body, :image_url, :link_url)

json.author do
  json.partial!("api/users/user", user: post.author)
end
