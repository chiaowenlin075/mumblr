Mumblr.Views.CurrentUserBlog = Backbone.CompositeView.extend({

  template: JST['blogs/blog_main'],

  initialize: function(){
    this.model = Mumblr.CurrentUser.blog();
    this.listenTo(this.model, "sync", this.render);
    debugger
    this.model.fetch();
  },

  render: function(){
    var content = this.template({ blog: this.model });
    this.$el.html(content);
    var postsIndexView = new Mumblr.Views.PostsIndex({ collection: this.model.posts() });
    this.$el.append(postsIndexView.render().$el);

    return this;
  }

});
