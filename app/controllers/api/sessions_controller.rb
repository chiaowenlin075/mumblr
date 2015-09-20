module Api
  class SessionsController < ApplicationController

    def show
      if current_user
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

    def destroy
      logout_user!
      render json: {}
    end

    private
    def session_params
      params.require(:user).permit(:email, :password).values
    end
  end
end