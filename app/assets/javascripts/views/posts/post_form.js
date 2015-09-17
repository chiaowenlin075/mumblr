Mumblr.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],
  className: "new-post",

  initialize: function(options){
    this.collection = this.model.blog.posts();
    this.model.set({
      blog_id: this.model.blog.escape('id'),
      post_type: options.postType
    });
  },

  events: {
    // "click button.close": "remove", //why it still work even without this event handler?
    "click button.submit": "submit"
  },

  render: function(){
    var content = this.template({
      user: this.model.blog.owner(),
      post: this.model
    });
    this.$el.html(content);

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$(".post-form").serializeJSON();
    // if (Object.keys(input.post).length)
    //  validate input!!

    this.model.save(input.post, {
      success: function(model){
        this.collection.add(model);
        this.remove();
      }.bind(this)
    });
  }
});
