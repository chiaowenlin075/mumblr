# == Schema Information
#
# Table name: blogs
#
#  id                      :integer          not null, primary key
#  title                   :string
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

require 'rails_helper'

RSpec.describe Blog, type: :model do

  let (:owner) { FactoryGirl.build(:user) }
  let (:blog) { FactoryGirl.build(:blog, url: owner.username.split().join("").underscore) }

  describe "model validations" do
    it { should validate_presence_of(:owner) }
    it 'is has unique custom url that matches its owners username' do
      expect(blog.url).to eq(owner.username.split().join("").underscore)
    end
  end

  describe "associations" do
    it { should belong_to(:owner) }
    it { should have_many(:posts).dependent(:destroy) }
    it { should have_many(:followings).dependent(:destroy) }
    it { should have_many(:followers) }
    it { should have_many(:followers_blogs) }
  end
end
