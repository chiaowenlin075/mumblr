# == Schema Information
#
# Table name: blogs
#
#  id             :integer          not null, primary key
#  title          :string           not null
#  owner_id       :integer          not null
#  description    :text
#  url            :string
#  background_url :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Blog < ActiveRecord::Base
  validates :owner, :title, presence: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :blog
  has_many :posts, inverse_of: :blog, dependent: :destroy

  after_initialize {
    self.title ||= "Untitled"
    self.background_url ||= "blog_default_back.jpg"
  }
end
