class UsersController < ApplicationController
  before_action :require_login, only: [:edit, :update, :destroy]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      @blog = Blog.create!(owner_id: @user.id)

      redirect_to root_url
    else
      render :new
    end
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
