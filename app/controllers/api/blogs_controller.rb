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
      @posts = Post.includes(:author, :likings, :taggings).where(blog_id: @blog.id)

      @followings_hash, @likings_hash = {}, {}
      if logged_in?
        @followings_hash[@blog.id] = @blog.followings.find_by(follower_id: current_user.id)
        @likings_hash = current_user.post_likes_hash
      end

      render :show
    end

    def index
      @blogs = Blog.preload(:owner)
                   .joins("LEFT OUTER JOIN followings ON followings.blog_id = blogs.id")
                   .group("blogs.id")
                   .order("COUNT (followings.*) DESC")
                   .select("blogs.*, COUNT (followings.*) AS num_followers")
                   .page(params[:page])
                   .per(10)
      if logged_in?
        @followings_hash = current_user.blog_follow_hash
      else
        @followings_hash = {}
      end

      render :index
    end

    def update
      @blog = Blog.includes(:owner, :followers).find(params[:id])
      return unless is_owner?(@blog)

      if @blog.update(blog_params)
        render :update_show
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
      params.require(:blog).permit(:title, :description, :url, :background)
    end

    def is_owner?(blog)
      blog.owner_id == current_user.id
    end
  end
end
