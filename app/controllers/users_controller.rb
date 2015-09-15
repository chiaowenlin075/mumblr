class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to root_url
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    if current_user.update(user_params)
      redirect_to root_url
    else
      render json: current_user.errors.full_messages, status: 422
    end
  end

  def destroy
    current_user.destroy!
    redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
