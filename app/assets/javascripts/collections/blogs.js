Mumblr.Collections.Blogs = Backbone.Collection.extend({
  url: "/api/blogs",
  model: Mumblr.Models.Blog,

  initialize: function(){
    this._page = 1;
  },

  blogs: function(){
    this._blogs = this._blogs || new Mumblr.Collections.Blogs();
    return this._blogs;
  },

  parse: function(payload){
    if (payload.hasOwnProperty("total_count")) {
      this._totalCount = payload.total_count;
      delete payload.total_count;
    };

    if (payload.hasOwnProperty("total_pages")) {
      this._totalPages = payload.total_pages;
      delete payload.total_pages;
    };

    if (payload.blogs) {
      this.blogs().set(payload.blogs, { parse: true });
      delete payload.blogs;
    };

    return payload
  }

});
