json.partial!("api/users/user", user: current_user, need_followed_blogs: true)

json.blog_id current_user.blog.id

# json.recent_tags do
#   json.array! user.recent_tags do |tag|
#     json.extract!(tag, :id, :label, :post_id)
#   end
# end
