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

require 'rails_helper'
require 'byebug'

RSpec.describe Tagging, type: :model do
  let (:tagging) { FactoryGirl.create(:tagging) }

  describe "model validations" do
    it { should validate_presence_of(:post) }
    it { should validate_presence_of(:tagger) }
    it { should validate_presence_of(:label) }
    it { should validate_length_of(:label).is_at_most(25) }
    it "should has unique label in scope of post" do
      invalid_tagging = FactoryGirl.build(:tagging, label: tagging.label, post: tagging.post)
      invalid_tagging.valid?
      expect(invalid_tagging.errors.full_messages).to include("Label has already been taken")
    end
    it 'label prefix with #' do
      expect(tagging.label[0]).to eq("#")
    end
  end

  describe "associations" do
    it { should belong_to(:tagger) }
    it { should belong_to(:post) }
  end
end
