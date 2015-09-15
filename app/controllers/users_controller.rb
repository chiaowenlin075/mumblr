class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to root_url
    else
      flash[:notice] = @user.errors.full_messages.join(", ")
      render :new
      # json: @user.errors.full_messages, status: 422
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
    params.require(:user).permit(:email, :password, :username)
  end
end
