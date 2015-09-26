module Api
  class PostsController < ApplicationController

    def create
      @post = current_user.posts.new(post_params.except(:tags))

      if @post.save
        @post.create_tags(post_params[:tags], current_user.id)

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

      if @post.update(post_params.except(:tags))
        @post.create_tags(post_params[:tags], current_user.id)
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

    def feeds
      blog_range = current_user.followed_blogs.to_a.map(&:id) << current_user.blog.id
      @posts = Post.preload(:author, :likings, :taggings)
                   .joins("LEFT OUTER JOIN likings ON likings.post_id = posts.id")
                   .group("posts.id")
                   .where("posts.blog_id IN (?)", blog_range)
                   .order("COUNT (likings.*) DESC, posts.updated_at DESC")
                   .page(params[:page])

      render :index
    end

    def liked_posts
      @posts = current_user.liked_posts
                                 .order("likings.created_at DESC")
                                 .includes(:author, :taggings)
                                 .page(params[:page])
      render :index
    end

    private

    def post_params
      params.require(:post).permit(
        :blog_id, :post_type, :title, :body, :image, :link_url, :tags
      )
    end

    def is_author?(post)
      post.author_id == current_user.id
    end
  end
end
