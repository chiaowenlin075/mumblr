Mumblr.Views.BlogsIndex = Backbone.CompositeView.extend({
  template: JST['blogs/index'],
  className: "blogs",

  initialize: function(){
    this.listenTo(this.collection, "sync", this.addBlogs);
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
