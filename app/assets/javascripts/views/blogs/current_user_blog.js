Mumblr.Views.Blog = Backbone.CompositeView.extend({
  template: JST['blogs/show'],
  className: "blog",

  initialize: function(){
    this.model = new Mumblr.Models.CurrentUserBlog();
    this.listenTo(this.model, "sync", this.render);
    this.model.fetch();
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var postOptionsBar = new Mumblr.Views.PostOptionsBar({ blog: this.model });
    postOptionsBar.render();
    var postsIndexView = new Mumblr.Views.PostsIndex({ collection: this.model.posts() });
    postsIndexView.render()
    this.$el.append(postOptionsBar.$el, postsIndexView.$el);

    return this;
  }

});
