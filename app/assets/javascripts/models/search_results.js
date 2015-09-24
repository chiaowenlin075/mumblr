Mumblr.Models.SearchResults = Backbone.Model.extend({
  url: "/api/search",

  initialize: function(options){
    this._query = options.query;
    this.blogPage = 1;
    this.postPage = 1;
    this.search();
  },

  search: function(){
    // this._query = query;
    this.fetch({
      data: {
        query: this._query,
        blog_page: this._blogPage,
        post_page: this._postPage
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

  changePage: function(typePage, delta){
    this[typePage] += delta;
    this.search();
  },

  // when parse, check the size of collection, if less than 25, than its the last page
  parse: function(payload){
    debugger
    if (payload.blogs){
      this.blogs().set(payload.blogs, { parse: true });
      delete payload.blogs;
    };

    if (payload.posts){
      this.posts().set(payload.posts, { parse: true });
      delete payload.posts;
    };

    return payload;
  }
});
