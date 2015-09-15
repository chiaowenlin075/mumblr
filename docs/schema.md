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
title       | string    | not null
body        | string    |
image_url   | string    |
link_url    | string    |
like_count  | integer   | not null, default: 0

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
blog_id     | integer   | not null, foreign key (references blogs)
follower_id | integer   | not null, foreign key (references users)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null
post_id     | integer   | not null, foreign key (references posts)

## likes
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
