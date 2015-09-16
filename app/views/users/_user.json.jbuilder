json.extract!(user, :id, :email, :username, :activated)
json.avatar_url asset_path(user.avatar_url)
