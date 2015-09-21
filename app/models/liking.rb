# == Schema Information
#
# Table name: likings
#
#  id         :integer          not null, primary key
#  post_id    :integer          not null
#  liker_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Liking < ActiveRecord::Base
  validates :post, :liker, presence: true
  validate :no_like_twice
  validate :no_like_self_post

  belongs_to :post, inverse_of: :likes
  belongs_to :liker,
    class_name: "User",
    foreign_key: :liker_id,
    inverse_of: :likes

  private
  def no_like_twice
    likers = Liking.joins(:post)
                   .where("posts.id = ?", self.post_id)
                   .pluck("likings.liker_id")
    if likers.include?(liker_id)
      errors[:invalid!] << "Can't like same post twice!"
    end
  end

  def no_like_self_post
    owned_post = Post.where(id: self.post_id).where(author_id: self.liker_id)
    unless owned_post.empty?
      errors[:invalid!] << "Can't like your own post!"
    end
  end
end
