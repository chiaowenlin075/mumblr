User.destroy_all
Blog.destroy_all
Post.destroy_all

users = ["sennacy", "breakfast", "gizmo", "markov"]
post_types = ["text", "image", "link", "quote"]
file = ["bagcat.gif", "cat.jpg", "chef.gif", "corgi.gif", "dog1.pg", "dog2.jpg", "mopping.gif"]

users.each do |user|
  p = Post.create!(
    email: "#{user.downcase}@cat.com",
    password: user,
    username: user
  )
  b = Blog.create!(
    owner_id: p.id,
    title: "#{user}'s Blog",
    description: "Hello there! #{user} is mumblrrring here~ <3"
  )
end

u1 = User.first
b1.Blog.first
u2 = User.find(2)
b2 = Blog.find(2)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "quote",
  title: "Albert Einstein",
  body: "Genius is 1% talent and 99% percent hard work.."
)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "image",
  image: File.open("app/assets/images/bagcat.gif"),
  body: "There's a cute cat in the bag..."
)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "image",
  image: File.open("app/assets/images/corgi.gif"),
  body: "What a cute corgi!"
)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "text",
  title: "W8D2",
  body: "Blablablablablabla"
)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "quote",
  title: "Jonathan",
  body: "Let's name it Sennacy!"
)

Post.create!(
  author_id: u1.id,
  blog_id: b1.id,
  post_type: "link",
  link_url: "http://www.grumpycats.com/",
  body: "This site is full of grumpy cats lol..."
)


Post.create!(
  author_id: u2.id,
  blog_id: b2.id,
  post_type: "quote",
  title: "Blablablablablablablabla",
  body: "Gizmo"
)

Post.create!(
  author_id: u2.id,
  blog_id: b2.id,
  post_type: "image",
  image: File.open("app/assets/images/mopping.gif"),
  body: "This is a weird cat..."
)

Post.create!(
  author_id: u2.id,
  blog_id: b2.id,
  post_type: "link",
  link_url: "http://www.google.com/",
  body: "My favorite searching engine..."
)

Post.create!(
  author_id: u2.id,
  blog_id: b2.id,
  post_type: "text",
  title: "Diary",
  body: "Blablablablablabla"
)
