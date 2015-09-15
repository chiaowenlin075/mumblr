Mumblr.Models.Blog = Backbone.Model.extend({
  urlRoot: "/api/blogs",

  owner: function(){
    this._owner = this._owner || new Mumblr.Models.User();
    return this._owner;
  },

  posts: function(){
    this._posts = this._posts || new Mumblr.Collections.Posts({
      blog: this
    });

    return this._posts;
  },

  parse: function(payload){
    if (payload.posts){
      this.posts().set(payload.posts, { parse: true });
      delete payload.posts
    };
    if (payload.owner){
      this.owner().set(payload.owner);
      delete payload.owner
    };

    return payload;
  }

});
