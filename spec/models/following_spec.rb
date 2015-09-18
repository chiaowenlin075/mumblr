# == Schema Information
#
# Table name: followings
#
#  id          :integer          not null, primary key
#  blog_id     :integer          not null
#  follower_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Following, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
