Mumblr.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/index'],

  initialize: function(options){
    this.isBlog = options.isBlog;
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
    this.listenTo(this.collection, "add remove", this.render);
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
  },

 removePost: function(model){
    this.removeModelSubview(".posts-index", model);
  }

});
