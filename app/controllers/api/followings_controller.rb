module Api
  class FollowingsController < ApplicationController

    def create
      @following = current_user.followings.new(following_params)
      if @following.save
        render :show
      else
        render json: @following.errors.full_messages, status: 422
      end
    end

    def index
      @followings = current_user.followings
      render :index
    end

    def destroy
      @following = Following.find(params[:id]).destroy!
      render json: {}
    end

    private
    def following_params
      params.require(:following).permit(:blog_id)
    end
  end
end
