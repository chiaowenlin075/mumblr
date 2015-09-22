# Schema Information

## blogs
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
owner_id        | integer   | not null, foreign key (references users)
title           | string    | not null
description     | text      |
url             | string    |
background_url  | string    |


## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
blog_id     | integer   | not null, foreign key (references blogs)
post_type   | string    | not null
title       | string    |
body        | string    |
image_url   | string    |
link_url    | string    |


#### For image: has image_url/body(optional)
#### For quote: has body(as quote body)/title(as who said the quote)
#### For link: has link_url/title/body(optional)

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
blog_id     | integer   | not null, foreign key (references blogs)
follower_id | integer   | not null, foreign key (references users)

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null
post_id     | integer   | not null, foreign key (references posts)
tagger_id   | integer   | not null, foreign key (references users)

## likings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (references posts)
liker_id    | integer   | not null, foreign key (references users)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
username        | string    | not null, unique
avatar_url      | string    |

## sessions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
session_token   | string    | not null, unique
