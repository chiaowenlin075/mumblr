Mumblr.Models.Blog = Backbone.Model.extend({
  urlRoot: "/api/blogs",

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

    return payload;
  }
});
