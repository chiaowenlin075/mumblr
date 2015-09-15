window.Mumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    this.$rootEl = $("#main");
  }
};

$(document).ready(function(){
  Mumblr.initialize();
});
