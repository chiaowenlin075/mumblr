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

require 'rails_helper'

RSpec.describe Tagging, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
