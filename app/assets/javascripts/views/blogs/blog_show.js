Mumblr.Views.BlogShow = Backbone.CompositeView.extend({
  template: JST['blogs/show'],
  className: "blog",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    "click .edit-blog": "editBlog"
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      currentUser: Mumblr.CurrentUser
    });
    this.$el.html(content);
    var postsIndexView = new Mumblr.Views.PostsIndex({
      collection: this.model.posts(),
      isBlog: true
    });
    this.addSubview(".blog-posts", postsIndexView)
    var followWidget = new Mumblr.Views.FollowWidget({
      model: this.model
    })
    this.addSubview(".follow-status", followWidget)
    return this;
  },

  editBlog: function(event){
    event.preventDefault();
    var editForm = new Mumblr.Views.BlogEdit({ model: this.model });
    $("body").append(editForm.render().$el);
  }

});
