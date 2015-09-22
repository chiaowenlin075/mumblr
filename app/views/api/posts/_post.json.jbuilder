json.extract!(post, :id, :blog_id, :post_type, :title, :body, :link_url, :created_at)
json.num_likes post.likings.size

if post.image
json.image_url asset_path(post.image.url)
end

if post.link_url
  json.link_title post.link_title
end

json.author do
  json.partial!("api/users/user", user: post.author, need_followed_blogs: false, need_likeStatus: false)
end

json.tags post.taggings.pluck(:label)

if need_likeStatus
  json.liking likings_hash[post.id]
end
