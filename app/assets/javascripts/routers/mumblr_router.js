Mumblr.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "posts", // temp: should be route to "posts"
    "dashboard": "dashboard",
    "followers": "follower",
    "blog/:id": "blog"
  },



  dashboard: function(){
    // var newView = new Mumblr.Views.Dashboard({ collection: })
  },

  posts: function(){
    // posts and followers share the same ".main-sidebar",
    // check whether theres content inside .main-sidebar, if no, add into it
    var contentView = new Mumblr.Views.CurrentUserPosts();
    this._swapView(contentView, ".main-content");

    var blogInfo = new Mumblr.Views.BlogInfo();
    this._swapView(blogInfo, ".main-sidebar");
  },

  blog: function(id){
    var blog = new Mumblr.Models.Blog({ id: id });
    blog.fetch();
    var blogView = new Mumblr.Views.BlogShow({ model: blog });
    this._swapView(blogView);
  },

  followers: function(){
    // posts and followers share the same ".main-sidebar",
    // check whether theres content inside .main-sidebar, if no, add into it
    // handle this in swapView maybe?
  },

  userEdit: function(){

  },

  _swapView: function(newView, selector){
    this._currentView = this._currentView || {};
    if (typeof selector !== 'undefined'){
      this._clearSubView(".blog-container", null);
      this._clearSubView(selector, newView)
      this.$rootEl.find(selector).html(newView.render().$el);
    } else {
      for (key in this._currentView){ this._clearSubView(key, null); };
      this._currentView[".blog-container"] = newView;
      this.$rootEl.find(".blog-container").html(newView.render().$el);
    }
  },

  _clearSubView: function(selector, newView){
    if (this._currentView[selector]){
      this._currentView[selector].remove();
      this._currentView[selector] = newView;
    };
  }
});
