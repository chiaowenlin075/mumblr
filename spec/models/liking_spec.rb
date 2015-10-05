# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  post_id    :integer          not null
#  liker_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'
require 'byebug'

RSpec.describe Liking, type: :model do
  let (:post) { FactoryGirl.create(:post, post_type: "text") }

  describe "model validations" do
    it { should validate_presence_of(:liker) }
    it { should validate_presence_of(:post) }
    it 'fails validation when like the same post twice' do
      liker = FactoryGirl.build(:user)
      first_liking = post.likings.create!(liker: liker)
      repeated_liking = post.likings.new(liker: liker)
      repeated_liking.valid?
      expect(repeated_liking.errors.full_messages).to include("Invalid! Can't like same post twice!")
    end

    it 'fails validation when like your own post' do
      liking = post.likings.new(liker: post.author)
      liking.valid?
      expect(liking.errors.full_messages).to include("Invalid! Can't like your own post!")
    end
  end

  describe "associations" do
    it { should belong_to(:liker) }
    it { should belong_to(:post) }
  end
end
