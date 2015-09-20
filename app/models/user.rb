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
  validates :email, :username, presence: true, uniqueness: true
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

  attr_reader :password

  after_initialize {
    self.activation_token = generate_activation_token
  }

  def self.find_by_credential(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
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
    zipped_follows = followings.pluck(:blog_id).zip(followings)
    follow_hash = {}

    zipped_follows.each do |id, like|
      follow_hash[id] = like
    end

    follow_hash
  end

  def feed(limit, time_stone)
    # SELECT owned_posts.* AS owned_posts, followed_posts.* AS followed_posts
    # FROM posts AS owned_posts
    # JOIN users ON owned_posts.author_id = users.id
    # JOIN follows ON follows.follower_id = users.id
    # JOIN blogs ON followed_blog_id = blogs.id
    # JOIN posts AS followed_posts ON posts.blog_id = blogs.id
    # WHERE users.id = current_user.id AND posts's created at > given time
    # LIMIT limit_time

    # WHERE posts.blog_id IN (...)
    # OR posts.author_id = self.id
  end

  def recent_tags
    # sql find recent tags limit (10)
  end
end
