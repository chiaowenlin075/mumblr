Mumblr.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/index'],

  initialize: function(options){
    this.isBlog = options.isBlog;
    this.listenTo(this.collection, "add remove", this.addPost);
    this.collection.each(this.addPost.bind(this));
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPost: function(model){
    if (this.isBlog) {
      var postView = new Mumblr.Views.PostShow({ model: model });
    } else {
      var postView = new Mumblr.Views.PostsIndexItem({ model: model });
    };
    this.addSubview(".posts-index", postView, true);
  }

});
