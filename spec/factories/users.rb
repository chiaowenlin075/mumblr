# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  email            :string           not null
#  password_digest  :string           not null
#  username         :string           not null
#  activated        :boolean          default(FALSE), not null
#  activation_token :string           not null
#  avatar_url       :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

FactoryGirl.define do
  factory :user do
    
  end

end
