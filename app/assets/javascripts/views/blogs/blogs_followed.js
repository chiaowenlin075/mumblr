Mumblr.Views.BlogsFollowed = Backbone.CompositeView.extend({
  template: JST['blogs/followed'],
  className: "followed-blogs",

  initialize: function(){
    this.collection = Mumblr.CurrentUser.followedBlogs()
    this.listenTo(this.collection, "remove", this.removeBlog)
    this.listenTo(this.collection, "remove", this.render);
    this.addBlogs(this.collection);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBlogs: function(collection){
    collection.forEach(function(model){
      var blogIndexItemView = new Mumblr.Views.BlogsIndexItem({ model: model });
      this.addSubview(".followed-blogs-index", blogIndexItemView);
    }.bind(this));
  },

  removeBlog: function(model){
    this.removeModelSubview(".followed-blogs-index", model);
  }

});
