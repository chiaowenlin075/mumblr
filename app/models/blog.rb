# == Schema Information
#
# Table name: blogs
#
#  id                      :integer          not null, primary key
#  title                   :string           not null
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
  validates :owner, presence: true

  has_attached_file :background, default_url: "background/blog_default_back.jpg"
  validates_attachment_content_type :background, content_type: /\Aimage\/.*\Z/

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :blog
  has_many :posts, inverse_of: :blog, dependent: :destroy
  has_many :followings, inverse_of: :blog, dependent: :destroy
  has_many :followers, through: :followings, source: :follower

  before_save {
    self.title = title == "" ? "Untitled" : title
  }
end
