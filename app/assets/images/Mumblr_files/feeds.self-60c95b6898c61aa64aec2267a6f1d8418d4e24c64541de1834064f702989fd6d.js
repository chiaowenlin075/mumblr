Mumblr.Views.Feeds = Backbone.CompositeView.extend({
  template: JST['posts/feeds'],
  className: "posts-main",

  initialize: function(options){
    this.blog = options.blog;
    this.user = Mumblr.CurrentUser;
    this.listenTo(this.user, "sync", this.render);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var postOptionsBar = new Mumblr.Views.PostOptionsBar({
      blog: this.blog,
      collection: this.user.feeds()
    });
    this.addSubview(".post-option-bar", postOptionsBar);
    var postsIndexView = new Mumblr.Views.PostsIndex({
      collection: this.user.feeds(),
      isBlog: false
     });
    this.addSubview(".posts", postsIndexView);

    return this;
  }

});
