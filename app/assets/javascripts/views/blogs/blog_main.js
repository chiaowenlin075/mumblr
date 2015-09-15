Mumblr.Views.BlogShow = Backbone.CompositeView.extend({

  template: JST['blogs/blog_show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.model.posts(), "add", this.addPost);
    // // this.model.posts().
  },

  render: function(){
    var content = this.template({ blog: this.model });
    this.$el.html(content);
    var postsIndexView = new Mumblr.Views.PostsIndex({ collection: this.model.posts() });
    this.$el.append(postsIndexView.render().$el);
    return this;
  }

});
