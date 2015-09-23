# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Session < ActiveRecord::Base
  validates :user, presence: true
  validates :session_token, presence: true, uniqueness: true
  belongs_to :user, inverse_of: :sessions

  after_initialize {
    self.session_token ||= generate_session_token
  }

  def generate_session_token
    loop do
      code = SecureRandom::urlsafe_base64(16)
      return code unless self.class.exists?(session_token: code)
    end
  end
end
