module Api
  class SearchesController < ApplicationController
    def show
      @blog_results = Blog.includes(:owner, :followings)
                          .search_by_title_and_description(params[:query])
                          .page(params[:blog_page])
      post_results_ids = Tagging.search_by_label(params[:query]).map(&:post_id)
      @post_results = Post.includes(:author, :likings, :taggings)
                          .where("posts.id IN (?)", post_results_ids)
                          .page(params[:post_page])

      @followings_hash, @likings_hash = {}, {}
      if logged_in?
        @followings_hash = current_user.blog_follow_hash
        @likings_hash = current_user.post_likes_hash
      end
      render :search
    end

  end
end
