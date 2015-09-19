module Api
  class PostsController < ApplicationController
  
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
        render json: @post.errors.full_messages, status: 422
      end
    end

    # might not need Posts#index, Blogs#show will handle all the posts
    # def index
    #   # all posts in the same blog (your posts)
    #   @posts = current_user.posts #.includes(:likes, :comments, :tags)
    # end

    # def feed
      # all posts from you/subscirbed blogs
      # @followed_blogs = current_user.followed_blogs

      # @posts = feed(params[:limit], params[:time_stone])
    # end

    def show
      @post = Post.includes(:author).find(params[:id]) #.includes(:likes, :comments, :tags)
      render :show
    end

    def update
      @post = Post.find(params[:id])
      return unless is_author?(@post)

      if @post.update(post_params)
        render :show
      else
        render json: @post.errors.full_messages, status: 422
      end
    end

    def destroy
      @post = Post.find(params[:id])
      return unless is_author?(@post)
      @post.destroy!
      render json: {}
    end

    private
    def post_params
      params.require(:post).permit(
        :blog_id, :post_type, :title, :body, :image, :link_url
      )
    end

    def is_author?(post)
      post.author_id == current_user.id
    end
  end
end
