Mumblr.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/show'],
  className: "post",
  tagName: "article",

  initialize: function(){
    this.listenTo(this.model, "change destroy", this.render);
  },

  render: function(){
    var content = this.template({
      post: this.model,
      currentUser: Mumblr.CurrentUser
    });
    this.$el.html(content);

    if (this.$(".like-status").length) {
      var likeWidget = new Mumblr.Views.LikeWidget({
        model: this.model
      })
      this.addSubview(".like-status", likeWidget);
    };

    return this;
  }

});
