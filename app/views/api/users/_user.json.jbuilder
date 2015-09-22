json.extract!(user, :id, :email, :username, :activated, :created_at)
json.avatar_url asset_path(user.avatar.url)

if need_followed_blogs
  json.followed_blogs user.followed_blogs do |blog|
    json.partial!(
      "api/blogs/blog",
      blog: blog,
      need_posts: false,
      need_followers: false,
      need_followStatus: false
    )
  end
end
