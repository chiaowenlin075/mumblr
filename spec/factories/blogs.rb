# == Schema Information
#
# Table name: blogs
#
#  id                      :integer          not null, primary key
#  title                   :string           not null
#  owner_id                :integer          not null
#  description             :text
#  url                     :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  background_file_name    :string
#  background_content_type :string
#  background_file_size    :integer
#  background_updated_at   :datetime
#

FactoryGirl.define do
  factory :blog do
    
  end

end
