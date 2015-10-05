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

require 'rails_helper'
require 'byebug'
RSpec.describe Following, type: :model do
  let (:blog) { FactoryGirl.build(:blog) }

  describe "model validations" do
    it { should validate_presence_of(:follower) }
    it { should validate_presence_of(:blog) }
    it 'fails validation when follow the same blog twice' do
      follower = FactoryGirl.build(:user)
      first_following = FactoryGirl.create(:following, blog: blog, follower: follower)
      repeated_following = FactoryGirl.build(:following, blog: blog, follower: follower)
      repeated_following.valid?
      expect(repeated_following.errors.full_messages).to include("Invalid! Can't follow same blog twice!")
    end

    it 'fails validation when follow your own blog' do
      check_following = FactoryGirl.create(:following, blog: blog, follower: blog.owner)
      check_following.valid?
      expect(check_following.errors.full_messages).to include("Invalid! Can't follow your own blog!")
    end

  end

  describe "associations" do
    it { should belong_to(:follower) }
    it { should belong_to(:blog) }
  end
end
