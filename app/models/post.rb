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
  validate :valid_link_url

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :posts
  belongs_to :blog, inverse_of: :posts

  # get the preview info for the link
  def link_title
    return unless link_url
    URI.parse(link_url).host ? URI.parse(link_url).host : link_url
  end

  private

  def valid_link_url
    return unless link_url
    begin
      URI.parse(link_url)
    rescue URI::Error => e
      errors[:invalid] << "Given link is not supported"
    end
  end

end
