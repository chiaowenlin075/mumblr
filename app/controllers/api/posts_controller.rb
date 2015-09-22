module Api
  class PostsController < ApplicationController

    def create
      @post = current_user.posts.new(post_params)
      @post_type = params[:post_type]

      if @post.save
        render :new_post
      else
        render json: @post.errors.full_messages, status: 422
      end
    end

    def show
      @post = Post.includes(:likings, :author, :taggings).find(params[:id]) #.includes(:likes, :comments, :tags)

      @likings_hash = {}
      if logged_in?
        @likings_hash[@post.id] = @post.likings.find_by(liker_id: current_user.id)
      end
      render :show
    end

    def update
      @post = Post.find(params[:id])
      return unless is_author?(@post)

      if @post.update(post_params)
        render :update_show
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
