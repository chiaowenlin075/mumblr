Mumblr.Views.BlogMain = Backbone.CompositeView.extend({

  template: JST['blogs/blog_main'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template({ blog: this.model });
    this.$el.html(content);
    var postsIndexView = new Mumblr.Views.PostsIndex({ collection: this.model.posts() });
    this.$el.append(postsIndexView.render().$el);
    return this;
  }

});
