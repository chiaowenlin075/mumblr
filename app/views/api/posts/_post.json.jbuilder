json.extract!(post, :id, :blog_id, :post_type,
              :num_likes, :title, :body, :link_url)
if post.image
json.image_url asset_path(post.image.url)
end

if post.link_url
  json.link_title post.link_title
end

json.author do
  json.partial!("api/users/user", user: post.author, need_followed_blogs: false)
end
