json.partial!("api/users/user", user: current_user)

# json.recent_tags do
#   json.array! user.recent_tags do |tag|
#     json.extract!(tag, :id, :label, :post_id)
#   end
# end
