Mumblr.Models.Post = Backbone.Model.extend({
  initialize: function(options){
    this.blog = options.blog;
  },

  urlRoot: function(){
    // in case this.blog is instance of CurrentUserBlog
    return "/api/blogs/" + this.blog.escape('id') + "/posts";
  },

  author: function(){
    this._author = this._author || new Mumblr.Models.User();
    return this._author;
  },

  parse: function(payload){
    if (payload.author){
      this.author().set(payload.author);
      delete payload.author
    };
    return payload;
  }

});
