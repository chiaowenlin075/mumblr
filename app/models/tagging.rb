# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  post_id    :integer          not null
#  tagger_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_by_label, against: [:label]

  validates :label, :post, :tagger, presence: true
  validates :label, uniqueness: { scope: :post, case_sensitive: true }
  validates :label, length: { maximum: 25 }
  before_save :prefix_hash

  belongs_to :post, inverse_of: :taggings
  belongs_to :tagger,
    class_name: "User",
    foreign_key: :tagger_id,
    inverse_of: :taggings

  private
  def prefix_hash
    reg = /(\w+)/
    self.label = "#" + reg.match(label)[1]
  end

end
