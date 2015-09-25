Mumblr.Collections.Posts = Backbone.Collection.extend({
  model: Mumblr.Models.Post,
  url: "api/posts",

  initialize: function(){
    this._page = 1;
  }

});
