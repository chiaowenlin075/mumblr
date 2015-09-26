Mumblr.Views.PostsIndex = Backbone.CompositeView.extend({
  template: JST['posts/index'],

  initialize: function(options){
    this.isBlog = options.isBlog;
    this.postsCollection = options.postsCollection;
    this.listenTo(this.postsCollection, "sync", this.render)
    this.listenTo(this.collection, "add", this.addPost);
    this.listenTo(this.collection, "remove", this.removePost);
    this.listenTo(this.collection, "add", this.render);
    this.collection.each(this.addPost.bind(this));
  },

  events: {
    "click .next-page": "nextPage",
    "click .prev-page": "prevPage"
  },

  render: function(){
    var content = this.template({
      collection: this.collection,
      postsCollection: this.postsCollection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPost: function(model){
    debugger
    if (this.isBlog) {
      var postView = new Mumblr.Views.PostShow({ model: model });
    } else {
      var postView = new Mumblr.Views.PostsIndexItem({ model: model });
    };
    this.addSubview(".posts-index", postView);
  },

  removePost: function(model){
    this.removeModelSubview(".posts-index", model);
  },

  nextPage: function (event) {
    event.preventDefault();
    this.postsCollection.changePage(+1);
    window.scrollTo(0, 0);
  },

  prevPage: function(event){
    event.preventDefault();
    this.postsCollection.changePage(-1);
    window.scrollTo(0, 0);
  }

});
