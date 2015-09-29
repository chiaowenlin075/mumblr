# mumblr

[Heroku link][heroku]

[heroku]: https://mumblrr.herokuapp.com/

![mumblr]

## Hello there!
Mumblr is a blog web app inspired by tumblr and built primary on Rails and Backbone.
Created for the demostration of my skills as a full-stack web developer.

I implement the app with couple different layouts to provide diverse interface.
I also designed some hover stylings for the purpose of a more clear usage.
With async requests, the app runs with better efficiency as well as user interactions.

## What I use?

### Languages:
- Javascript
- Ruby
- HTML / CSS

### Frameworks:
- Backbone
- Rails

### Libraries and Technologies:
- jQuery / AJAX
- jQuery-UI
- paperclip / AWS
- friendly_id
- pg_search
- kaminari
- figaro
- jbuilder
- omniauth

## What can you do?

Part of the functions accessible when you are not sign in...
- Search keyword for blogs(title/description) or posts(tag), the search result of blogs ordered by numbers of followers, while the search result of posts ordered by 1) most liked 2) newest.
- Explore hottest blogs ordered by most followed and follow them!

Full functions...
- Securely create an account or sign in/sign up with facebook
- Receive a welcome email after sign up to activate your account
- Own a blog and have custom blog background and your username as blog custom URL
- Post four types of post(text/image/link/quote)
- Can follow or be followed, you can see the posts from your subscribed blogs at your dashboard
- Post can be liked and tagged
- Edit your account info, blog detail(background) and post(add/delete tags)
- Infinite scroll and pagination to browse more content

## Highlight problems that I solved

- Always care about performance
  - Prefetch datas to prevent any N + 1 database queries
  - Reduce the queries as much as possible
- DRY up my code as much as possible
  - Reuse views with different stylings in different interface
  - Apply different conditions to jbuilder partials to cater to different cases
  - Utilize mixins to reduce repeated codes
- Search result contains two different types of objects
  - Search route make two search requests to both blogs and tags
  - Both prefetch relevant datas and use SQL queries to get association objects
- Validate link post URL and get the info of that link
  - Use URI to read the link resource and grab the title of given URL
  - Validate the link URL to prevent private or invalid URL
- Nested composite views
  - Each views in charge of minimal functionality
  - Use composite views to reduce garbage collections

## Future bonus features
- Audio and chat posts
- Notifications and activity history
- Comments on posts
- Custom layout for posts(change font style)

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
[mumblr]: ./mumblr.gif
