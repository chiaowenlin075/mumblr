Mumblr.Models.Post = Backbone.Model.extend({
    urlRoot: "/api/posts",

    options: {
      targetEvent: "liking",
      foreignKey: "post_id"
    },

    toJSON: function(){
      var json = { post: _.clone(this.attributes) };
      return json;
    },

    author: function(){
      this._author = this._author || new Mumblr.Models.User();
      return this._author;
    },

    taggings: function(){
      this._taggings = this._taggings || new Mumblr.Collections.Taggings();
      return this._taggings;
    },

    parse: function(payload){
      if (payload.author) {
        this.author().set(payload.author);
        delete payload.author
      };
      if (payload.taggings) {
        this.taggings().set(payload.taggings);
        delete payload.taggings;
      }
      this.parseTarget(payload);
      return payload;
    },

    like: function(){
      return this.target();
    },

    toggleLike: function(){
      this.toggleEvent();
    }

});

_.extend(Mumblr.Models.Post.prototype, Mumblr.Mixins.FollowOrLikeable);
_.extend(Mumblr.Models.Post.prototype, Mumblr.Mixins.SaveFormData);
