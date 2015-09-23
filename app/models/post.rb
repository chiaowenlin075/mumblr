# == Schema Information
#
# Table name: posts
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  blog_id            :integer          not null
#  post_type          :string           not null
#  title              :string
#  body               :text
#  link_url           :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#
require 'open-uri'

class Post < ActiveRecord::Base
  include DateFormatable

  validates :author, :blog, presence: true
  validates :post_type, inclusion: %w(text image quote link)
  validate :validate_link_url
  before_validation :link_url_check

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :posts
  belongs_to :blog, inverse_of: :posts
  has_many :likings,
    class_name: "Liking",
    inverse_of: :post,
    dependent: :destroy
  has_many :taggings, inverse_of: :post, dependent: :destroy

  def self.welcome_post(blog_id)
    Post.create!(
      author_id: User.find_by(username: "Sennacy").id,
      blog_id: blog_id,
      post_type: "image",
      image: File.open("app/assets/images/dancing_cat.gif"),
      body: "Welcome to Mumblr, please use it with <3, " +
            "use 'Dashboard to browse your own posts also the posts from blogs " +
            "you subscribed, use 'explore' to check out hottest blogs!"
    )
  end

  def link_url_check
    return unless link_url
    self.link_url = /^http[s]*:\/\/.+/.match(link_url) ? link_url : "http://" + link_url
  end

  # get the preview info for the link
  def link_title
    return unless link_url
    begin
      find_title = URI.parse(link_url).read.match(/<title>(.*)<\/title>/)
      return find_title ? find_title[1] : "Untitled"
    rescue
      return "Untitled"
    end
  end

  private
  def link_url_valid?
    begin
      open(link_url)
      return true
    rescue
      return false
    end
  end

  def validate_link_url
    return unless link_url
    if !link_url_valid?
      errors[:invalid!] << "Given link is not supported"
    end
  end

end
