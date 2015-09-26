Mumblr.Models.Blog = Backbone.Model.extend({
  urlRoot: "/api/blogs",

  options: {
    targetEvent: "following",
    foreignKey: "blog_id"
  },

  owner: function(){
    this._owner = this._owner || new Mumblr.Models.User();
    return this._owner;
  },

  posts: function(){
    this._posts = this._posts || new Mumblr.Collections.Posts();
    return this._posts;
  },

  followers: function(){
    this._followers = this._followers || new Mumblr.Collections.Users();
    return this._followers;
  },

  parse: function(payload){
    this.parsePageInfo(payload);
    this.parseTarget(payload);
    if (payload.posts){
      this.posts().set(payload.posts, { parse: true });
      delete payload.posts
    };

    if (payload.owner){
      this.owner().set(payload.owner);
      delete payload.owner
    };
    if (payload.followers){
      this.followers().set(payload.followers);
      delete payload.followers
    };

    return payload;
  },

  follow: function(){
    return this.target();
  },

  toggleFollow: function(){
    this.toggleEvent();
  }

});

_.extend(Mumblr.Models.Blog.prototype, Mumblr.Mixins.FollowOrLikeable);
_.extend(Mumblr.Models.Blog.prototype, Mumblr.Mixins.SaveFormData);
_.extend(Mumblr.Models.Blog.prototype, Mumblr.Mixins.Paginate);
