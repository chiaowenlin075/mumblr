window.Mumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.CurrentUser = new Mumblr.Models.CurrentUser();
    this.CurrentUser.fetch();
    this.$rootEl = $("#main");
  }
};

$(document).ready(function(){
  Mumblr.initialize();
});
