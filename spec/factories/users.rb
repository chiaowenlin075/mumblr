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

FactoryGirl.define do
  factory :user, aliases: [:author, :owner, :follower, :liker, :tagger]do
    email { Faker::Internet.email }
    password { Faker::Lorem.characters(10) }
    username { Faker::Name.name }

    factory :user_with_blog do
      after(:create) do |user, evaluator|
        create_list(:blog, user: user)
      end
    end

    factory :user_with_posts do
       transient do
         posts_count 5
       end

       after(:create) do |user, evaluator|
         create_list(:post, evaluator.posts_count, user: user, blog: user.blog, post_type: "text")
       end
    end
  end

end
