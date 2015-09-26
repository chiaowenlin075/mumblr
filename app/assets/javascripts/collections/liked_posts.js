Mumblr.Collections.LikedPosts = Backbone.Collection.extend({
  url: "/api/liked_posts",
  model: Mumblr.Models.Post,

  posts: function(){
    this._posts = this._posts || new Mumblr.Collections.Posts();
    return this._posts;
  },

  parse: function(payload){
    this.parsePageInfo(payload);
    if (payload.posts) {
      this.posts().set(payload.posts, { parse: true });
      delete payload.posts
    };

    return payload
  }
});

_.extend(Mumblr.Collections.LikedPosts.prototype, Mumblr.Mixins.Paginate);
