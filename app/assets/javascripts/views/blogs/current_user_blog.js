Mumblr.Views.CurrentUserBlog = Backbone.CompositeView.extend({

  template: JST['blogs/blog_main'],
  className: "posts-main",

  initialize: function(){
    this.model = new Mumblr.Models.CurrentUserBlog();
    this.listenTo(this.model, "sync", this.render);
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
