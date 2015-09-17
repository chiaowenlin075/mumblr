User.create(email: "sennacy@cat.com", password: "sennacy", username: "Sennacy")
Blog.create!(owner_id: 1, title: "Sennacy's Blog")
User.create(email: "breakfast@cat.com", password: "breakfast", username: "Breakfast")
Blog.create!(owner_id: 2, title: "Breakfast's Blog")

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "quote",
  title: "Albert Einstein",
  body: "Genius is 1% talent and 99% percent hard work.."
)

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "quote",
  title: "Jonathan",
  body: "Let's name it Sennacty!"
)

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "image",
  # image_url: "bagcat.gif",
  body: "There's a cute cat in the bag..."
)

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "image",
  # image_url: "corgi.gif",
  body: "What a cute corgi!"
)

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "link",
  link_url: "http://www.grumpycats.com/",
  body: "This site is full of grumpy cats lol..."
)

Post.create!(
  author_id: 1,
  blog_id: 1,
  post_type: "text",
  title: "W8D2",
  body: "Blablablablablabla"
)

Post.create!(
  author_id: 2,
  blog_id: 2,
  post_type: "quote",
  title: "Blablablablablablablabla",
  body: "Gizmo"
)

Post.create!(
  author_id: 2,
  blog_id: 2,
  post_type: "image",
  # image_url: "mopping.gif",
  body: "This is a weird cat..."
)

Post.create!(
  author_id: 2,
  blog_id: 2,
  post_type: "link",
  link_url: "http://www.google.com/",
  body: "My favorite searching engine..."
)

Post.create!(
  author_id: 2,
  blog_id: 2,
  post_type: "text",
  title: "Dairy",
  body: "Blablablablablabla"
)
