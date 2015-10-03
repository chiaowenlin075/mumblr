Mumblr.Views.BlogShow = Backbone.CompositeView.extend({
  template: JST['blogs/show'],
  className: "blog",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render)
    this.addPostIndex();
    this.addFollowWidget();
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
    this.attachSubviews();

    return this;
  },

  editBlog: function(event){
    event.preventDefault();
    var editForm = new Mumblr.Views.BlogEdit({ model: this.model });
    $("body").append(editForm.render().$el);
  },

  addPostIndex: function(){
    var postsIndexView = new Mumblr.Views.PostsIndex({
      postsCollection: this.model,
      collection: this.model.posts(),
      isBlog: true
    });
    this.addSubview(".blog-posts", postsIndexView);
  },

  addFollowWidget: function(){
    var followWidget = new Mumblr.Views.FollowWidget({
      model: this.model
    });
    this.addSubview(".follow-status", followWidget);
  }

});
