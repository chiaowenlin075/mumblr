class UserMailer < ApplicationMailer
  default from: "Mumblrr Admin <noreply@mumblrr.com>"

  def activate_email(user)
    @user = user
    @url = activate_api_users_url(activation_token: user.activation_token)
    mail(to: user.email, subject: 'Thank you for signning up at mumblrr.com!')
  end

end
