Mumblr.Models.SearchResults = Backbone.Model.extend({
  url: "/api/search",

  initialize: function(options){
    this._query = options.query;
    this.blogPage = 1;
    this.postPage = 1;
    this.search();
  },

  search: function(){
    this.fetch({
      data: {
        query: this._query,
        blog_page: this.blogPage,
        post_page: this.postPage
      }
    });
  },

  blogs: function(){
    this._blogs = this._blogs || new Mumblr.Collections.Blogs();
    return this._blogs;
  },

  posts: function(){
    this._posts = this._posts || new Mumblr.Collections.Posts();
    return this._posts;
  },

  changeBlogPage: function(delta){
    this.blogPage += delta;
    this.search();
  },

  postInfiniteScroll: function(){
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    this.fetch({
			remove: false,
			data: {
				query: this._query,
				page: this.postPage++
			},
			success: function () {
				this.requestingNextPage = false;
				this.postPage++;
			}.bind(this)
		});
  },

  parse: function(payload){
    if (payload.blogs){
      this.blogs().set(payload.blogs, { parse: true });
      delete payload.blogs;
    };

    if (payload.posts){
      this.posts().set(payload.posts, { parse: true });
      delete payload.posts;
    };

    if (payload.blog_total_count) {
      this.blog_total_count = payload.blog_total_count;
    };

    if (payload.post_total_count) {
      this.post_total_count = payload.post_total_count;
    };

    if (payload.blog_total_pages) {
      this.blog_total_pages = payload.blog_total_pages;
    };

    if (payload.post_total_pages) {
      this.post_total_pages = payload.post_total_pages;
    };

    return payload;
  }
});
