window.Mumblr = {
  Mixins: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    $("body").append("<div class='block'><i class='icon-spinner'/></div>");

    this.CurrentUser = new Mumblr.Models.CurrentUser();
    this.CurrentUser.fetch({
      success: function(){
        setTimeout(function(){
          $("body").find(".block").remove();
        },0);
      }
    });

    this.router = new Mumblr.Routers.Router({ $rootEl: $("#container") });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Mumblr.initialize();
});
