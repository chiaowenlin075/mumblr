Mumblr.Collections.Blogs = Backbone.Collection.extend({
  url: "/api/blogs",
  model: Mumblr.Models.Blog,

  initialize: function(){
    this._page = 1;
  }

});
