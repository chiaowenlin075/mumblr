json.partial!("user", user: current_user)

json.blog do
    json.extract!(current_user.blog, :id, :title, :description, :url, :background_url)
end

# json.recent_tags do
#   json.array! user.recent_tags do |tag|
#     json.extract!(tag, :id, :label, :post_id)
#   end
# end
