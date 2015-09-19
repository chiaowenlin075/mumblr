window.Mumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.CurrentUser = new Mumblr.Models.CurrentUser();
    this.CurrentUser.fetch();

    this.router = new Mumblr.Routers.Router({ $rootEl: $("#container") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Mumblr.initialize();
});
