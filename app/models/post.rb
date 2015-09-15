# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  blog_id    :integer          not null
#  post_type  :string           not null
#  title      :string
#  body       :text
#  image_url  :string
#  link_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :author, :blog, presence: true
  validates :post_type, inclusion: %w(text image quote link)

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :posts
  belongs_to :blog, inverse_of: :posts

  # if a link post doesn't have a title, get the host name from link_url
  def link_title

  end

end
