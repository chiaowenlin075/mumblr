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

FactoryGirl.define do
  factory :tagging do
    label Faker::Lorem.word
    tagger
    association :post, factory: :post, post_type: "text"
  end

end
