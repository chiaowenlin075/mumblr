module Api
  class UsersController < ApplicationController
    before_action :require_login

    def show
      @user = User.find(params[:id])
      render :show
    end

    def current_user
      render :current_user
    end

    def update
      if current_user.update(user_params)
        redirect_to root_url
      else
        render :edit
      end
    end

    def destroy
      current_user.destroy!
      redirect_to new_session_url
    end

    private
    def user_params
      params.require(:user).permit(:email, :password, :username)
    end

  end
end
