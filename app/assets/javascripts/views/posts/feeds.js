Mumblr.Views.Feeds = Backbone.CompositeView.extend({
  template: JST['posts/main_content_posts'],
  className: "posts-main",

  initialize: function(options){
    this.blog = options.blog;
    this.fetchObject = options.fetchObject;
    this.addPostIndex();
    if (options.needNewPostBar) {
      this.addPostOptionBar();
    };
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addPostOptionBar: function(){
    var postOptionsBar = new Mumblr.Views.PostOptionsBar({
      blog: this.blog,
      collection: this.collection
    });
    this.addSubview(".post-option-bar", postOptionsBar);
  },

  addPostIndex: function(){
    var postsIndexView = new Mumblr.Views.PostsIndex({
      postsCollection: this.fetchObject,
      collection: this.collection,
      isBlog: false
     });
    this.addSubview(".posts", postsIndexView);
  }

});
