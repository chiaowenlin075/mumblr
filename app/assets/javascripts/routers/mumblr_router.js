Mumblr.Routers.Router = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "dashboard": "dashboard",
    "blog/:id": "blog"
  },

  dashboard: function(){
    // var newView = new Mumblr.Views.Dashboard({ collection: })
  },

  blog: function(id){
    var blog = new Mumblr.Models.Blog({ id: id });
    blog.fetch({
      success: function(model){
        var contentView = new Mumblr.Views.BlogMain({ model: blog });
        this._swapView(".main-content", contentView);
      }.bind(this)
    });
    // debugger
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
