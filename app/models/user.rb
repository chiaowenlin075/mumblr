# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  username            :string           not null
#  activated           :boolean          default(FALSE), not null
#  activation_token    :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  include DateFormatable

  validates :email, :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :password_digest, presence: { message: "You forgot to enter your password!" }
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :avatar, styles: {
    thumb: "64x64>",
    origin:  "800x600>"
  }, default_url: "cat.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :sessions, inverse_of: :user, dependent: :destroy
  has_one :blog,
    class_name: "Blog",
    foreign_key: :owner_id,
    inverse_of: :owner,
    dependent: :destroy
  has_many :posts,
    class_name: "Post",
    foreign_key: :author_id,
    inverse_of: :author,
    dependent: :destroy
  has_many :followings,
    foreign_key: :follower_id,
    inverse_of: :follower,
    dependent: :destroy
  has_many :followed_blogs, through: :followings, source: :blog
  has_many :likings,
    class_name: "Liking",
    foreign_key: :liker_id,
    inverse_of: :liker,
    dependent: :destroy
  has_many :liked_posts, through: :likings, source: :post
  has_many :taggings,
    class_name: "Tagging",
    foreign_key: :tagger_id,
    inverse_of: :tagger,
    dependent: :destroy

  attr_reader :password

  after_initialize {
    self.activation_token ||= generate_activation_token
  }

  after_save {
    if self.blog && self.blog.url != username.split().join("").underscore
      self.blog.url != username.split().join("").underscore
      self.blog.slug = self.blog.url
      self.blog.save!
    end
  }

  def self.find_by_credential(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      uid: auth_hash[:uid],
      provider: auth_hash[:provider]
    )

    unless user
      user = User.create!(
        uid: auth_hash[:uid],
        provider: auth_hash[:provider],
        username: check_username(auth_hash[:info][:name]),
        email: generate_random_email,
        password: SecureRandom::urlsafe_base64
      )
      blog = Blog.create!(owner_id: user.id)
      Post.welcome_post(blog.id)
    end

    user
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest) == password
  end

  def generate_activation_token
    loop do
      code = SecureRandom::urlsafe_base64(20)
      return code unless self.class.exists?(activation_token: code)
    end
  end

  def blog_follow_hash
    zipped_follows = followings.to_a.map(&:blog_id).zip(followings)
    follow_hash = {}

    zipped_follows.each do |id, like|
      follow_hash[id] = like
    end

    follow_hash
  end

  def post_likes_hash
    zipped_likes = likings.to_a.map(&:post_id).zip(likings)
    likes_hash = {}

    zipped_likes.each do |id, like|
      likes_hash[id] = like
    end

    likes_hash
  end

  def recent_tags
    self.taggings.sort_by(&:created_at).reverse!.take(10).map(&:label)
  end

  def generate_random_email
    loop do
      email = SecureRandom::urlsafe_base64 + "@mumblr.com"
      return email unless self.class.exists?(email: email)
    end
  end

  def check_username(username)
    if self.class.exists?(username: username)
      loop do
        username = username + rand(10).to_s
        return username unless self.class.exists?(username: username)
      end
    end

    username
  end

end
