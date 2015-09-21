# == Schema Information
#
# Table name: followings
#
#  id          :integer          not null, primary key
#  blog_id     :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Following < ActiveRecord::Base
  validates :blog, :follower, presence: true
  validate :no_follow_twice
  validate :no_follow_self_blog

  belongs_to :blog, inverse_of: :followings
  belongs_to :follower,
    class_name: "User",
    foreign_key: :follower_id,
    inverse_of: :followings

  private
  def no_follow_twice
    followers = Following.joins(:blog)
                         .where("blogs.id = ?", self.blog_id)
                         .pluck("followings.follower_id")
    if followers.include?(follower_id)
      errors[:invalid!] << "Can't follow same blog twice!"
    end
  end

  def no_follow_self_blog
    owned_blog = Blog.where(id: self.blog_id).where(owner_id: self.follower_id)
    unless owned_blog.empty?
      errors[:invalid!] << "Can't follow your own blog!"
    end
  end
end
