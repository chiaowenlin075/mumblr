u1 = User.create(email: "sennacy@cat.com", password: "sennacy", username: "Sennacy")
b1 = Blog.create!(owner_id: 1, title: "Sennacy's Blog")
u2 = User.create(email: "breakfast@cat.com", password: "breakfast", username: "Breakfast")
b2 = Blog.create!(owner_id: 2, title: "Breakfast's Blog")

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
  title: "Dairy",
  body: "Blablablablablabla"
)
