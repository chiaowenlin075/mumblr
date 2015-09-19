window.Mumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.CurrentUser = new Mumblr.Models.CurrentUser();
    this.CurrentUser.fetch();

    var router_main = new Mumblr.Routers.Router({
      $rootEl: $("#container")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Mumblr.initialize();
});
