Mumblr.Views.CurrentUserPosts = Backbone.CompositeView.extend({
  template: JST['posts/current_user_posts'],
  className: "posts-main",

  initialize: function(options){
    this.model = options.blog
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var postOptionsBar = new Mumblr.Views.PostOptionsBar({
      blogId: this.model.escape('id'),
      collection: this.model.posts()
    });
    this.addSubview(".post-option-bar", postOptionsBar);
    var postsIndexView = new Mumblr.Views.PostsIndex({
      collection: this.model.posts(),
      isBlog: false
     });
    this.addSubview(".posts", postsIndexView);

    return this;
  }

});
