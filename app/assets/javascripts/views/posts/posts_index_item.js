Mumblr.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],
  className: "posts-index-item",
  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "remove change destroy", this.render);
  },

  render: function(){
    var content = this.template({
      post: this.model,
      user: this.model.author()
    });
    this.$el.html(content);
    var postShowView = new Mumblr.Views.PostShow({
      model: this.model
    });
    this.$el.append(postShowView.render().$el);
    return this;
  }

});
