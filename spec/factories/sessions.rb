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

FactoryGirl.define do
  factory :session do
    association :user, factory: :user, strategy: :build 
    session_token { Faker::Lorem.characters(16) }
  end

end
