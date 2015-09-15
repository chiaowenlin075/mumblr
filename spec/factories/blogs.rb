# == Schema Information
#
# Table name: blogs
#
#  id             :integer          not null, primary key
#  title          :string           not null
#  owner_id       :integer          not null
#  description    :text
#  url            :string
#  background_url :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryGirl.define do
  factory :blog do
    
  end

end
