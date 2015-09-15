Mumblr.Models.Post = Backbone.Model.extend({
  initialize: function(options){
    this.blog = options.blog;
  },

  urlRoot: function(){
    return this.blog.url() + "/posts";
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
