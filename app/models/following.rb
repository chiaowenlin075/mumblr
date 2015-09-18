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

  private
  def no_follow_twice
    followers = Following.joins("blogs")
                         .where("blogs.id = ?", self.blog_id)
                         .pluck("followings.follower_id")

  end
end
