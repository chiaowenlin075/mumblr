Mumblr.Views.CurrentUserPosts = Backbone.CompositeView.extend({
  template: JST['posts/main_content_posts'],
  className: "posts-main",

  initialize: function(options){
    this.model = options.blog
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var postOptionsBar = new Mumblr.Views.PostOptionsBar({
      blog: this.model,
      collection: this.model.posts(),
    });
    this.addSubview(".post-option-bar", postOptionsBar);
    var postsIndexView = new Mumblr.Views.PostsIndex({
      // fetchObject: this.model,
      collection: this.model.posts(),
      isBlog: false
     });
    this.addSubview(".posts", postsIndexView);

    return this;
  }

});
