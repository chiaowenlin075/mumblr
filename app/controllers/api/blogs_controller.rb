module Api
  class BlogsController < ApplicationController
    before_action :require_login
    
    def create
      @blog = Blog.new(blog_params)
      @blog.owner_id = current_user.id

      if @blog.save
        render "show"
        # render @blog.includes(:posts)
      else
        render :new
        # render json: @blog.errors.full_messages, status: 422
      end
    end

    def show
      @blog = Blog.find(params[:id])#.includes(:posts)
      render "show"
    end

    def update
      @blog = Blog.find(params[:id])
      return unless @blog.owner_id == current_user.id

      if @blog.update(blog_params)
        render "show"
      else
        render text: "Something went wrong!"
      end
    end

    def destroy
      @blog = Blog.find()
      return unless @blog.owner_id == current_user.id
      @blog.destroy!
      redirect_to root_url
    end

    private
    def blog_params
      params.require(:blog).premit(:title, :description, :url, :background_url)
    end
  end
end
