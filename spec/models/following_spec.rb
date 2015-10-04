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

RSpec.describe Following, type: :model do
  let!(:blog_owner) { FactoryGirl.build(:user) }
  let!(:blog) { FactoryGirl.build(:blog, owner: blog_owner) }
  let!(:following) { FactoryGirl.build(:following) }

  describe "model validations" do
    it { should validate_presence_of(:follower) }
    it { should validate_presence_of(:blog) }
    it 'fails validation when follow the same blog twice' do
      follower = FactoryGirl.build(:user)
      first_following = Following.create!(blog: blog, follower: follower)
      repeated_following = Following.new(blog: blog, follower: follower)
      repeated_following.valid?
      expect(repeated_following.errors.full_messages).to include("Invalid! Can't follow same blog twice!")
    end

    it 'fails validation when follow your own blog' do
      following = Following.create!(blog: blog, follower: blog_owner)
      following.valid?
      expect(following.errors.full_messages).to include("Invalid! Can't follow your own blog!")
    end

  end

  describe "associations" do
    it { should belong_to(:follower) }
    it { should belong_to(:blog) }
  end
end
