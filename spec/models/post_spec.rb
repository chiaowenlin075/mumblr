# == Schema Information
#
# Table name: posts
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  blog_id            :integer          not null
#  post_type          :string           not null
#  title              :string
#  body               :text
#  link_url           :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'rails_helper'

RSpec.describe Post, type: :model do

    let!(:author) { FactoryGirl.build(:user) }
    let!(:blog) { FactoryGirl.build(:blog) }
    let!(:post) { FactoryGirl.build(:post, post_type: "link") }

    describe "model validations" do
      it { should validate_presence_of(:author) }
      it { should validate_presence_of(:blog) }
      it { should validate_inclusion_of(:post_type).in_array(%w(text image quote link))}
      it 'has link title when the post type is link' do
        expect(post.title).to_not be_empty
      end
    end

    describe "associations" do
      it { should belong_to(:author) }
      it { should belong_to(:blog) }
      it { should have_many(:likings).dependent(:destroy) }
      it { should have_many(:taggings).dependent(:destroy) }
    end
end
