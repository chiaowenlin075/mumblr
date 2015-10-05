# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Session, type: :model do
  subject { FactoryGirl.build(:session) }

  describe "model validations" do
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:session_token) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe "associations" do
    it { should belong_to(:user) }
  end
end
