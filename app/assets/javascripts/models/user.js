Mumblr.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  // overwrite to send password
  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }

});

Mumblr.Models.CurrentUser = Mumblr.Models.User.extend({
  url: "/api/session",

  initialize: function(options){
    this._page = 1;
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(model.parse(data));
        options.success && options.success();
      },
      error: function(resp){
        options.error && options.error(resp);
      }
     });
   },

   signOut: function(options){
     var model = this;

     $.ajax({
       url: this.url,
       type: "DELETE",
       dataType: "json",
       success: function(data){
         model.clear();
         options.success && options.success();
       }
     });
   },

  fireSessionEvent: function(){
    this.isSignedIn() ? this.trigger("signIn") : this.trigger("signOut");
  },

  followedBlogs: function(){
    this._followedBlogs = this._followedBlogs || new Mumblr.Collections.Blogs();
    return this._followedBlogs;
  },

  parse: function(payload){
    if (payload.recent_tags){
      this.recentTags = payload.recent_tags;
      delete payload.recent_tags;
    };

    if (payload.blog_id){
      this.blogId = payload.blog_id;
      delete payload.blog_id;
    };

    if (payload.followed_blogs){
      this.followedBlogs().set(payload.followed_blogs, { parse: true });
      delete payload.followed_blogs;
    };

    return payload;
  }

});

_.extend(Mumblr.Models.User.prototype, Mumblr.Mixins.SaveFormData);
