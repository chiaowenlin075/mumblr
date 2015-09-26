module Api
  class UsersController < ApplicationController

    def show
      @user = User.includes(:blog, :posts, :followed_blogs).find(params[:id])
      render :show
    end

    def create
      @user = User.new(user_params)

      if @user.save
        login_user!(@user)
        @blog = Blog.create!(owner_id: @user.id)
        Post.welcome_post(@blog.id)
        UserMailer.activate_email(@user).deliver
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def destroy
      current_user.destroy!
      render json: {}
    end

    def activate
      user = User.find_by(activation_token: params[:activation_token])

      if user
        user.activated = true
        user.save!
        login_user!(user)
        flash[:notice] = "Activate account successfully!"
        redirect_to root_url
      else
        render text: "Invalid request", status: :forbidden
      end
    end

    private
    def user_params
      params.require(:user).permit(:email, :password, :username, :avatar)
    end

  end
end
