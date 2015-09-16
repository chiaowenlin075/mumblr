module Api
  class UsersController < ApplicationController
    before_action :require_login, only: [:show, :update, :destroy, :current_user_show]

    def show
      @user = User.includes(:blog, :posts).find(params[:id])
      render :show
    end


    def current_user_show
      return unless current_user
      render :current_user_show
    end

    def update
      if current_user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def destroy
      current_user.destroy!
      render json: {}
    end

    private
    def user_params
      params.require(:user).permit(:email, :password, :username)
    end

  end
end
