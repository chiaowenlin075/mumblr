Mumblr.Views.PostOptionsBar = Backbone.CompositeView.extend({
  template: JST['posts/post_options_bar'],
  className: "new-post-options",
  tagName: "section",

  initialize: function(options){
    this.blog_id = options.blog_id;
    this.collection = options.collection;
  },

  events: {
    "click .post-options > li": "newPost"
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  newPost: function(event){
    event.preventDefault();
    var postType = $(event.currentTarget).data("post-type");
    var postForm = new Mumblr.Views.PostForm({
      model: new Mumblr.Models.Post(),
      collection: this.collection,
      blog_id: this.blog_id,
      postType: postType
    });

    $("body").append(postForm.render().$el);
  }

});
