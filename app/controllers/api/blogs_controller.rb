module Api
  class BlogsController < ApplicationController

    def create
      @blog = Blog.new(blog_params)
      @blog.owner_id = current_user.id

      if @blog.save
        render :show
      else
        render json: @blog.errors.full_messages, status: 422
      end
    end

    def show
      @blog = Blog.includes(:owner, :followers).find(params[:id]) #, :likes, :comments, :tags))
      @posts = Post.where(blog_id: @blog.id).includes(:author)
      render :show
    end

    def update
      @blog = Blog.includes(:owner, :followers).find(params[:id])
      return unless is_owner?(@blog)

      if @blog.update(blog_params)
        render :show
      else
        render json: @blog.errors.full_messages, status: 422
      end
    end

    def destroy
      @blog = Blog.find(params[:id])
      return unless is_owner?(@blog)
      @blog.destroy!
      render json: {}
    end

    private
    def blog_params
      params.require(:blog).premit(:title, :description, :url, :background)
    end

    def is_owner?(blog)
      blog.owner_id == current_user.id
    end
  end
end
