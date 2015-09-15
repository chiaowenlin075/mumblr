class SessionsController < ApplicationController

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
      # render json: @user.errors.full_messages, status: 422
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
