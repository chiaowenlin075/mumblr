json.partial!("api/users/user", user: current_user, need_followed_blogs: true)
json.blog_id current_user.blog.id
json.num_likes current_user.likings.to_a.size
json.recent_tags current_user.recent_tags
