Mumblr.Views.BlogsIndex = Backbone.CompositeView.extend({
  template: JST['blogs/index'],
  className: "blogs",

  initialize: function(options){
    this.bindScroll();
    this.blogsIndex = options.blogsIndex;
    this.options.searchResults = this.blogsIndex;
    this.collection = this.blogsIndex.blogs();
    this.listenTo(this.blogsIndex, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBlog);
  },

  render: function(){
    var content = this.template({ blogs: this.blogsIndex });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addBlog: function(model){
    var blogIndexItemView = new Mumblr.Views.BlogsIndexItem({ model: model });
    this.addSubview(".blogs-index", blogIndexItemView);
  }

});

_.extend(Mumblr.Views.BlogsIndex.prototype, Mumblr.Mixins.InfiniteScroll);
