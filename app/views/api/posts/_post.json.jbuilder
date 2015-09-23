json.extract!(post, :id, :blog_id, :post_type, :title, :body, :link_url, :created_at)
json.num_likes post.likings.size

json.image_url asset_path(post.image.url) if post.image
json.link_title post.link_title if post.link_url

json.author do
  json.partial!("api/users/user", user: post.author, need_followed_blogs: false, need_likeStatus: false)
end

json.tags post.taggings.pluck(:label)
json.liking likings_hash[post.id] if need_likeStatus
