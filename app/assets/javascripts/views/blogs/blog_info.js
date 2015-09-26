Mumblr.Views.BlogInfo = Backbone.CompositeView.extend({
  template: JST['blogs/blog_info'],
  className: "blog-info",

  initialize: function(options){
    this.model = options.blog;
    this.listenTo(this.model, "sync change:num_posts", this.render);
    this.listenTo(Mumblr.CurrentUser, "sync change", this.render);
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      user: Mumblr.CurrentUser
    });
    this.$el.html(content);

    return this;
  }

});
