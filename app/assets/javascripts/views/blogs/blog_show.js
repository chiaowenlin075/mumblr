Mumblr.Views.BlogShow = Backbone.CompositeView.extend({
  template: JST['blogs/show'],
  className: "blog",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      currentUser: Mumblr.CurrentUser
    });
    this.$el.html(content);
    var postsIndexView = new Mumblr.Views.PostsIndex({
      collection: this.model.posts(),
      isBlog: true
    });
    this.$(".blog-posts").append(postsIndexView.render().$el);
    return this;
  }

});
