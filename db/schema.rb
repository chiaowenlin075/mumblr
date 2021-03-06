# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150925143802) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blogs", force: :cascade do |t|
    t.string   "title"
    t.integer  "owner_id",                null: false
    t.text     "description"
    t.string   "url"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "background_file_name"
    t.string   "background_content_type"
    t.integer  "background_file_size"
    t.datetime "background_updated_at"
    t.string   "slug"
  end

  add_index "blogs", ["owner_id"], name: "index_blogs_on_owner_id", unique: true, using: :btree
  add_index "blogs", ["slug"], name: "index_blogs_on_slug", unique: true, using: :btree

  create_table "followings", force: :cascade do |t|
    t.integer  "blog_id",     null: false
    t.integer  "follower_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "followings", ["blog_id", "follower_id"], name: "index_followings_on_blog_id_and_follower_id", using: :btree
  add_index "followings", ["blog_id"], name: "index_followings_on_blog_id", using: :btree
  add_index "followings", ["follower_id"], name: "index_followings_on_follower_id", using: :btree

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "likings", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.integer  "liker_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likings", ["liker_id"], name: "index_likings_on_liker_id", using: :btree
  add_index "likings", ["post_id", "liker_id"], name: "index_likings_on_post_id_and_liker_id", using: :btree
  add_index "likings", ["post_id"], name: "index_likings_on_post_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",          null: false
    t.integer  "blog_id",            null: false
    t.string   "post_type",          null: false
    t.string   "title"
    t.text     "body"
    t.string   "link_url"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree
  add_index "posts", ["blog_id"], name: "index_posts_on_blog_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.string   "session_token", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree

  create_table "taggings", force: :cascade do |t|
    t.string   "label",      null: false
    t.integer  "post_id",    null: false
    t.integer  "tagger_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["post_id", "label"], name: "index_taggings_on_post_id_and_label", unique: true, using: :btree
  add_index "taggings", ["post_id"], name: "index_taggings_on_post_id", using: :btree
  add_index "taggings", ["tagger_id"], name: "index_taggings_on_tagger_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                               null: false
    t.string   "password_digest",                     null: false
    t.string   "username",                            null: false
    t.boolean  "activated",           default: false, null: false
    t.string   "activation_token",                    null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
