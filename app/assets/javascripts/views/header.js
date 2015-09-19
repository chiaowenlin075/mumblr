Mumblr.Views.Header = Backbone.CompositeView.extend({
  template: JST['header'],
  className: "header",
  tagName: "header",

  initialize: function(options){
    this.user = Mumblr.CurrentUser;
    this.listenTo(this.user, "sync", this.render);
  },

  events: {
    "click .log-out": "logOut"
  },

  render: function(){
    var content = this.template({
      user: this.user,
      num_likes: 3
    });
    this.$el.html(content);
    return this;
  },

  logOut: function(event){
    event.preventDefault();
    Mumblr.CurrentUser.signOut({
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      }
    });
    return;
  }

});
