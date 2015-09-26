module Api
  class SessionsController < ApplicationController

    def show
      if current_user
        @liked_posts = current_user_liked_posts
        render :show
      else
        render json: {}
      end
    end

    def create
      @user = User.find_by_credential(*session_params)

      if @user
        login_user!(@user)
        @liked_posts = current_user_liked_posts
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

    def omniauth
      @user = User.find_or_create_by_auth_hash(omniauth_hash)
      login_user!(@user)
      redirect_to root_url
    end

    private
    def session_params
      params.require(:user).permit(:email, :password).values
    end

    def update_params
      params.require(:user).permit(:username, :password, :avatar)
    end

    def omniauth_hash
      request.env["omniauth.auth"]
    end

    def current_user_liked_posts
      current_user.liked_posts
                  .order("likings.created_at DESC")
                  .includes(:author, :taggings)
                  .page(params[:page])
                  .per(25)
    end

  end
end
