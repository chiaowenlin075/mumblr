# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  blog_id    :integer          not null
#  title      :string
#  body       :text
#  image_url  :string
#  link_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :post do
    
  end

end
