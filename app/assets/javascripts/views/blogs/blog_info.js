Mumblr.Views.BlogInfo = Backbone.CompositeView.extend({
  className: "blog-info",
  template: JST['blogs/blog_info'],

  initialize: function(){
    this.model = new Mumblr.Models.CurrentUserBlog();
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      user: this.model.owner(),
      num_posts: this.model.posts().length//,
      // num_followers: this.model.followers().length
    });
    this.$el.html(content);
    // var tagsIndexView = new Mumblr.Views.TagsIndex({ collection: this.model.posts() });
    // this.$el.append(tagsIndexView.render().$el);

    return this;
  }

});
