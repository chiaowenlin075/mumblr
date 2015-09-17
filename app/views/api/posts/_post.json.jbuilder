json.extract!(post, :id, :blog_id, :post_type,
              :num_likes, :title, :body, :link_url)
json.image_url post.image.url

json.author do
  json.partial!("api/users/user", user: post.author)
end
