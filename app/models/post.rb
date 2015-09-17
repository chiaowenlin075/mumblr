# == Schema Information
#
# Table name: posts
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  blog_id            :integer          not null
#  post_type          :string           not null
#  num_likes          :integer          default(0), not null
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

class Post < ActiveRecord::Base
  validates :author, :blog, presence: true
  validates :post_type, inclusion: %w(text image quote link)

  has_attached_file :image, styles: { thumb: "64x64>" }, default_url: "cat.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :posts
  belongs_to :blog, inverse_of: :posts

  # if a link post doesn't have a title, get the host name from link_url
  def link_title

  end

end
