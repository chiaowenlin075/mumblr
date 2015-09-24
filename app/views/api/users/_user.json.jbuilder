json.extract!(user, :id, :email, :username, :activated, :created_at)
json.avatar_url asset_path(user.avatar.url)

if need_followed_blogs
  json.followed_blogs user.followed_blogs.includes(:owner) do |blog|
    json.partial!(
      "api/blogs/blog",
      blog: blog,
      need_posts: false,
      need_followers: false,
      need_followStatus: true,
      followings_hash: user.blog_follow_hash,
      need_num_follows: false,
      need_num_posts: false
    )
  end
end
