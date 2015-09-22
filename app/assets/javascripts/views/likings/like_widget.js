Mumblr.Views.LikeWidget = Backbone.View.extend({
  template: JST["likings/like_widget"],

  events: {
    "click": "toggleLike"
  },

  initialize: function () {
    this.listenTo(this.model, 'change:num_likes', this.render);
  },

  toggleLike: function (event) {
    event.preventDefault();
    this.model.toggleLike();
  },

  render: function () {
    var content = this.template({
      like: this.model.like()
    });
    this.$el.html(content);
    return this;
  }
});
