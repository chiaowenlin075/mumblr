Mumblr.Views.Feeds = Backbone.CompositeView.extend({
  template: JST['posts/feeds'],
  className: "posts-main",

  initialize: function(){
    this.user = Mumblr.CurrentUser;
    this.blog = new Mumblr.Models.Blog({ id: this.user.blog_id });
    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.blog, "sync", this.render);
    this.user.fetch();
    this.blog.fetch();
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
