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
    var contentView = new Mumblr.Views.CurrentUserBlog();
    this._swapView(".main-content", contentView);

    var blogInfo = new Mumblr.Views.BlogInfo();
    this._swapView(".main-sidebar", blogInfo);
  },

  followers: function(){

  },

  userEdit: function(){

  },

  _swapView: function(selector, newView){
    this._currentView = this._currentView || {};
    this._currentView[selector] && this._currentView.remove();
    this._currentView[selector] = newView;
    this.$rootEl.find(selector).html(newView.render().$el);
  }
});
