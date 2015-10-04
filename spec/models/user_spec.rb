# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  username            :string           not null
#  activated           :boolean          default(FALSE), not null
#  activation_token    :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

require 'rails_helper'

RSpec.describe User, type: :model do
  subject do
    FactoryGirl.build(:user)
  end

  describe "model validations" do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_uniqueness_of(:email) }
  end

  describe "associations" do
    it { should have_many(:sessions).dependent(:destroy)}
    it { should have_many(:posts).dependent(:destroy)}
    it { should have_many(:followings).dependent(:destroy)}
    it { should have_many(:followed_blogs)}
    it { should have_many(:likings).dependent(:destroy)}
    it { should have_many(:liked_posts)}
    it { should have_many(:taggings).dependent(:destroy)}
    it { should have_one(:blog).dependent(:destroy)}
  end

end
