json.extract!(blog, :id, :title, :description, :url)
json.background_url asset_path(blog.background.url)

json.owner do
  json.partial!("api/users/user", user: blog.owner, need_followed_blogs: false)
end

json.num_follows blog.followings.size if need_num_follows
json.num_posts blog.posts.size if need_num_posts
json.following followings_hash[blog.id] if need_followStatus

if need_posts
  json.posts posts do |post|
    json.partial!(
      "api/posts/post",
      post: post,
      need_likeStatus: need_likeStatus,
      likings_hash: likings_hash
    )
  end
end

if need_followers
  json.followers blog.followers do |follower|
    json.partial!("api/users/user", user: follower, need_followed_blogs: false)
  end
end
