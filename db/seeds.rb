User.create!(email: "test123", password: "test123", username: "test123")
Blog.create!(owner_id: 1, title: "Test Blog")
post_types = %w(text image link quote)

20.times do |idx|
  Post.create!(
    author_id: 1,
    blog_id: 1,
    post_type: post_types.sample
  )
end
