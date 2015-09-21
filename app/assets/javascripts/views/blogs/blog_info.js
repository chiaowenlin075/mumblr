Mumblr.Views.BlogInfo = Backbone.CompositeView.extend({
  template: JST['blogs/blog_info'],
  className: "blog-info",

  initialize: function(options){
    this.model = options.blog;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      user: this.model.owner(),
      num_posts: this.model.posts().length,//,
      num_followers: this.model.get("num_follows")
    });
    this.$el.html(content);
    // var tagsIndexView = new Mumblr.Views.TagsIndex({ collection: this.model.posts() });
    // this.$el.append(tagsIndexView.render().$el);

    return this;
  }

});
