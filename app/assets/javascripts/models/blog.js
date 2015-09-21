Mumblr.Models.Blog = Backbone.Model.extend(
  _.extend({}, Mumblr.Mixins.FollowOrLikeable, {
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
      this.parseTarget(payload);
      return payload;
    },

    follow: function(){
      return this.target();
    },

    toggleFollow: function(){
      this.toggleEvent();
    },

    saveBackground: function(formData, options){
      var model = this;
      $.ajax({
        url: _.result(model, "url"),
        method: "put",
        data: formData,
        processData: false,
        contentType: false,
        success: function(resp){
          model.set(model.parse(resp));
          model.trigger('sync', model, resp, options);
          options.success && options.success(model, resp, options);
        },
        error: function(resp){
          options.error && options.error(model, resp, options);
        }
      });
    }

  })
);
