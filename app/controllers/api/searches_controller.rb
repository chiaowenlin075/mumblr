module Api
  class SearchesController < ApplicationController
    def search_blogs
      @blog_results = Blog.includes(:owner, :followings)
                          .search_by_title_and_description(params[:query])
                          .page(params[:page])
                          .per(3)
      @followings_hash = {}
      if logged_in?
        @followings_hash = current_user.blog_follow_hash
      end
      render :search_blogs
    end

    def search_posts
      post_results_ids = Tagging.search_by_label(params[:query]).map(&:post_id)
      @post_results = Post.includes(:author, :likings, :taggings)
                          .where("posts.id IN (?)", post_results_ids)
                          .page(params[:page])
                          .per(10)
      @likings_hash = {}
      if logged_in?
        @likings_hash = current_user.post_likes_hash
      end

      render :search_posts
    end

  end
end
