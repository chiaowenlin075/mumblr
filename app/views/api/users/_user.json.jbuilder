json.extract!(user, :id, :email, :username, :activated)
json.avatar_url user.avatar.url
