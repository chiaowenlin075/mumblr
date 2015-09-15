class SessionsController < ApplicationController
  before_action :require_login, only: [:destroy]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credential(*session_params)

    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash[:notice] = "Invalid email and password combination!"
      render :new
    end
  end

  def destroy
    current_session.destroy!
    redirect_to root_url
  end

  private
  def session_params
    params.require(:user).permit(:email, :password).values
  end
end
