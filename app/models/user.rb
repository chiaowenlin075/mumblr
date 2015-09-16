# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  email            :string           not null
#  password_digest  :string           not null
#  username         :string           not null
#  activated        :boolean          default(FALSE), not null
#  activation_token :string           not null
#  avatar_url       :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :username, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank!" }
  validates :password, length: { minimum: 6, allow_nil: true }

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

  attr_reader :password

  after_initialize {
    self.activation_token = generate_activation_token
    self.avatar_url = "cat.jpg"
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

  def feed(limit, time_stone)
    # SELECT owned_posts AS owned_posts, followed_posts AS followed_posts
    # FROM posts AS owned_posts
    # JOIN users ON owned_posts.author_id = users.id
    # JOIN follows ON follows.follower_id = users.id
    # JOIN blogs ON followed_blog_id = blogs.id
    # JOIN posts AS followed_posts ON posts.blog_id = blogs.id
    # WHERE users.id = current_user.id AND posts's created at > given time
    # LIMIT limit_time
  end

  def recent_tags
    # sql find recent tags limit (10)
  end
end
