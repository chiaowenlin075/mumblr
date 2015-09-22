module Api
  class TaggingsController < ApplicationController

    def create
      @tagging = current_user.taggings.new(tagging_params)
      if @tagging.save
        render :show
      else
        render json: @tagging.errors.full_messages, status: 422
      end
    end

    def index
      @taggings = current_user.taggings
      render :index
    end

    def destroy
      @tagging = Tagging.find(params[:id]).destroy!
      render json: {}
    end

    private
    def tagging_params
      params.require(:tagging).permit(:post_id)
    end

  end
end
