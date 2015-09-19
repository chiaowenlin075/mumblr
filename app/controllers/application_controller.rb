class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  def current_user
    return unless current_session
    @user ||= User.includes(:blog, :posts, :followed_blogs)
                  .find(current_session.user_id)
  end

  def current_session
    return unless session[:session_token]
    @session ||= Session.find_by(session_token: session[:session_token])
  end

  def login_user!(user)
    new_session = Session.create!(user_id: user.id)
    session[:session_token] = new_session.session_token
  end

  def logout_user!
    current_session.destroy!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_active
    !current_user.activated
  end

  helper_method :current_user, :logged_in?, :require_active
end
