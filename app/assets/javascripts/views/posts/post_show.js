Mumblr.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],
  className: "post-item",
  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "remove change destroy", this.render);
  },

  render: function(){
    var content = this.template({
      post: this.model,
      user: this.model.author()
    });

    this.$el.html(content);
    return this;
  }

});
