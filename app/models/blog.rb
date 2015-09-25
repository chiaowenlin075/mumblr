# == Schema Information
#
# Table name: blogs
#
#  id                      :integer          not null, primary key
#  title                   :string
#  owner_id                :integer          not null
#  description             :text
#  url                     :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  background_file_name    :string
#  background_content_type :string
#  background_file_size    :integer
#  background_updated_at   :datetime
#

class Blog < ActiveRecord::Base
  include PgSearch
  extend FriendlyId
  pg_search_scope :search_by_title_and_description, against: [:title, :description]
  friendly_id :url, use: [:slugged, :finders]

  validates :owner, presence: true
  validates :url, uniqueness: true

  has_attached_file :background, default_url: "background/blog_default_back.jpg"
  validates_attachment_content_type :background, content_type: /\Aimage\/.*\Z/

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :blog
  has_many :posts, inverse_of: :blog, dependent: :destroy
  has_many :followings, inverse_of: :blog, dependent: :destroy
  has_many :followers, through: :followings, source: :follower
  has_many :followers_blogs, through: :followers, source: :blog

  after_initialize {
    self.slug = self.url
  }

  before_save {
    self.title = title == "" ? "Untitled" : title
    self.url ||= self.owner.username.split().join("").underscore
  }

end
