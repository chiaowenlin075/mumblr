module Api
  class PostsController < ApplicationController
    before_action :require_login

    def new
      @post = Post.new
      render :new
    end

    def create
      @post = current_user.posts.new(post_params)
      @post_type = params[:post_type]

      if @post.save
        render :show
      else
        render :new
        # render json: @post.errors.full_messages, status: 422
      end
    end

    def index
      # all posts in the same blog (your posts)
      @posts = current_user.posts #.includes(:likes, :comments, :tags)
    end

    def feed
      # all posts from you/subscirbed blogs
      # @followed_blogs = current_user.followed_blogs

      # @posts = feed(params[:limit], params[:time_stone])
    end

    def show
      @post = Post.find(params[:id])
    end

    def update
      @post = Post.find(params[:id])
      return unless @post.author_id == current_user.id

      if @post.update(post_params)
        render :show
      else
        render text: "Something went wrong!"
      end
    end

    def destroy
      @post = Post.find(params[:id])
      return unless @post.author_id == current_user.id
      @post.destroy!
      redirect_to api_blog_url(@post.blog_id)
    end

    private
    def post_params
      params.require(:post).permit(
        :blog_id, :post_type, :title, :body, :image_url, :link_url
      )
    end
  end
end
