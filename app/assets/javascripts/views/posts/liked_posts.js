Mumblr.Views.LikedPosts = Backbone.CompositeView.extend({
  template: JST['posts/main_content_posts'],
  className: "posts-main",

  initialize: function(){
    this.collection = Mumblr.CurrentUser.likedPosts()
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    var postsIndexView = new Mumblr.Views.PostsIndex({
      collection: this.collection,
      isBlog: false
     });
    this.addSubview(".posts", postsIndexView, true);

    return this;
  }

});
