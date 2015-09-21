module Api
  class LikingsController < ApplicationController
    def create
      @like = current_user.likings.new(like_params)
      if @like.save
        render :show
      else
        render json: @like.errors.full_messages, status: 422
      end
    end

    def index
      @likes = current_user.likes
      render :index
    end

    def destroy
      @like = Liking.find(params[:id]).destroy!
      render json: {}
    end

    private
    def like_params
      params.require(:liking).permit(:post_id)
    end
  end
end
