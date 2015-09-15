class SessionsController < ApplicationController

  def create
    @user = User.find_by_credential(*session_params)

    if @user
      login_user!(@user)
      redirect_to root_url
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @session = Session.find(params[:id])
    @session.destroy!
    redirect_to root_url
  end

  private
  def session_params
    params.require(:user).permit(:email, :password).values
  end
end
