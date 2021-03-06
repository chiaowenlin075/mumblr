Mumblr.Views.PostsIndexItem = Backbone.CompositeView.extend({
  template: JST['posts/index_item'],
  className: "posts-index-item",
  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "change destroy", this.render);
    this.addPost();
  },

  render: function(){
    var content = this.template({
      post: this.model,
      user: this.model.author()
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPost:function(){
    var postShowView = new Mumblr.Views.PostShow({
      model: this.model
    });
    this.addSubview(".post-show-container", postShowView);
  }

});
