Mumblr.Routers.Session = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "signIn",
    "users/new": "new"
  },

  header: function(){
    if (!this._currentView[".header-container"]){
      var headerView = new Mumblr.Views.Header();
      this._clearSubView(".header-container", headerView);
      this.$rootEl.find(".header-container").html(headerView.render().$el);
    }
  },

  sidebar: function(){
    if (!this._currentView[".main-sidebar"]){
      var blogInfo = new Mumblr.Views.BlogInfo();
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
    if (typeof selector !== 'undefined'){
      this.header();
      this._clearSubView(".blog-container", null);
      this._clearSubView(selector, newView)
      this.$rootEl.find(selector).html(newView.render().$el);
    } else {

      for (key in this._currentView){
        this._clearSubView(key, null);
      };
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
