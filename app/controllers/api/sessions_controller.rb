module Api
  class SessionsController < ApplicationController

    def show
      if current_user
        @liked_posts = current_user.liked_posts.includes(:author, :taggings)
        render :show
      else
        render json: {}
      end
    end

    def create
      @user = User.find_by_credential(*session_params)

      if @user
        login_user!(@user)
        render :show
      else
        head :unprocessable_entity
      end
    end

    def update
      if current_user.update(update_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def destroy
      logout_user!
      render json: {}
    end

    private
    def session_params
      params.require(:user).permit(:email, :password).values
    end

    def update_params
      params.require(:user).permit(:username, :password, :avatar)
    end
  end
end
