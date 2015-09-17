class UsersController < ApplicationController
  before_action :require_login, only: [:update, :destroy]

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
  #
  # def show
  #   @user = User.includes(:blog, :posts).find(params[:id])
  #   render :show
  # end

  private
  def user_params
    params.require(:user).permit(:email, :password, :username)
  end
end
