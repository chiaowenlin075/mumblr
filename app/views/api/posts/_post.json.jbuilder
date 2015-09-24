json.extract!(post, :id, :blog_id, :post_type, :title, :body, :link_url, :created_at)

json.image_url asset_path(post.image.url) if post.image

json.author do
  json.partial!("api/users/user", user: post.author, need_followed_blogs: false)
end

json.num_likes post.likings.to_a.count
json.taggings post.taggings
json.liking likings_hash[post.id] if need_likeStatus
