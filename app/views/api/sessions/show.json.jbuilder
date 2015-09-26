json.partial!("api/users/user", user: current_user, need_followed_blogs: true)
json.blog_id current_user.blog.id
json.recent_tags current_user.recent_tags
