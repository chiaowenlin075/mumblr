Mumblr.Views.BlogsIndex = Backbone.CompositeView.extend({
  template: JST['blogs/index'],
  className: "blogs",

  initialize: function(){
    this.bindScroll();
    this.listenTo(this.collection, "sync", this.addBlogs);
    this.options.searchResults = this.collection;
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
      this.addSubview(".blogs-index", blogIndexItemView);
    }.bind(this));
  }

});

_.extend(Mumblr.Views.BlogsIndex.prototype, Mumblr.Mixins.InfiniteScroll);
