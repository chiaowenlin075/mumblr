Mumblr.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "signIn",
    "_=_": "dashboard",
    "users/new": "new",
    "setting": "userEdit",
    "posts": "posts", // temp: should be route to "posts"
    "blog/:id": "blog",
    "dashboard": "dashboard",
    "explore": "explore",
    "followings": "followings",
    "likes": "likes",
    "search/:query": "search"
  },

  header: function(){
    if (!this._currentView[".header-container"]){
      var headerView = new Mumblr.Views.Header();
      this._clearSubView(".header-container", headerView);
      this.$rootEl.find(".header-container").html(headerView.render().$el);
    }
  },

  sidebar: function(blog){
    var callback = this.sidebar.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    if (!this._currentView[".main-sidebar"]){
      if (typeof blog === 'undefined'){
        blog = new Mumblr.Models.Blog({ id: Mumblr.CurrentUser.blogId });
        blog.fetch();
      }
      var blogInfo = new Mumblr.Views.BlogInfo({ blog: blog });
      this._swapView(blogInfo, ".main-sidebar");
    };
  },

  new: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new Mumblr.Models.User();
    var formView = new Mumblr.Views.UserForm({ model: model });
    this._swapView(formView);
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Mumblr.Views.SignIn({ callback: callback });
    this._swapView(signInView);
  },

  dashboard: function(){
    var callback = this.dashboard.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    var blog = new Mumblr.Models.Blog({ id: Mumblr.CurrentUser.blogId });
    var feeds = new Mumblr.Collections.Feeds();
    blog.fetch()
    feeds.fetch()
    var contentView = new Mumblr.Views.Feeds({
      blog: blog,
      fetchObject: feeds,
      collection: feeds.posts(),
      needNewPostBar: true
    });
    this._swapView(contentView, ".main-content");
    this.sidebar(blog);
  },

  posts: function(){
    var callback = this.posts.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var blog = new Mumblr.Models.Blog({ id: Mumblr.CurrentUser.blogId });
    blog.fetch();
    var contentView = new Mumblr.Views.Feeds({
      blog: blog,
      fetchObject: blog,
      collection: blog.posts(),
      needNewPostBar: true
    });
    this._swapView(contentView, ".main-content");
    this.sidebar(blog);
  },

  blog: function(id){
    var blog = new Mumblr.Models.Blog({ id: id });
    blog.fetch();
    var blogView = new Mumblr.Views.BlogShow({ model: blog });
    this._swapView(blogView);
  },

  explore: function(){
    var blogsIndex = new Mumblr.Collections.Blogs();
    blogsIndex.fetch();
    var blogsView = new Mumblr.Views.BlogsIndex({ blogsIndex: blogsIndex });
    this._swapView(blogsView, ".blog-container");
  },

  userEdit: function(){
    var callback = this.userEdit.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var editView = new Mumblr.Views.UserEditForm();
    this._swapView(editView, ".main-content");
    this.sidebar();
  },

  followings: function(){
    var callback = this.followings.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var blogsView = new Mumblr.Views.BlogsFollowed({
      collection: Mumblr.CurrentUser.followedBlogs()
    });
    this._swapView(blogsView, ".main-content");
    this.sidebar();
  },

  followers: function(){
    var callback = this.followers.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    // TBD
    this.sidebar();
  },

  likes: function(){
    var callback = this.likes.bind(this);
    if (!this._requireSignedIn(callback)) { return; }
    var likedPosts = new Mumblr.Collections.LikedPosts();
    likedPosts.fetch();

    var likedPostsView = new Mumblr.Views.Feeds({
      fetchObject: likedPosts,
      collection: likedPosts.posts(),
      needNewPostBar: false
    });
    this._swapView(likedPostsView, ".main-content");
    this.sidebar();
  },

  search: function(query){
    var searchResultsView = new Mumblr.Views.Search({ query: query })
    this._swapView(searchResultsView, ".blog-container");
  },

  _requireSignedIn: function(callback){
    if (!Mumblr.CurrentUser.isSignedIn()) {
      callback = callback || this._goSignIn.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Mumblr.CurrentUser.isSignedIn()) {
      callback = callback || this._goDashboard.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goSignIn: function(){
    Backbone.history.navigate("", { trigger: true });
  },

  _goDashboard: function(){
    Backbone.history.navigate("#dashboard", { trigger: true });
  },

  _swapView: function(newView, selector){
    this._currentView = this._currentView || {};
    if (typeof selector !== 'undefined' && selector !== ".blog-container"){
      this.header();
      this._clearSubView(".blog-container", null);
      this._clearSubView(selector, newView)
      this.$rootEl.find(selector).html(newView.render().$el);
    } else if (selector === ".blog-container"){
      for (key in this._currentView){ this._clearSubView(key, null); };
      this.header();
      this._currentView[".blog-container"] = newView;
      this.$rootEl.find(".blog-container").html(newView.render().$el);
    } else {
      for (key in this._currentView){ this._clearSubView(key, null); };
      this._currentView[".blog-container"] = newView;
      this.$rootEl.find(".blog-container").html(newView.render().$el);
    };
  },

  _clearSubView: function(selector, newView){
    if (this._currentView[selector]){
      this._currentView[selector].remove();
      this.$rootEl.find(selector).html("");
    };
    this._currentView[selector] = newView;
  }

});
