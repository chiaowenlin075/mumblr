Mumblr.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],

  initialize: function(options){
    this.collection = options.collection;
    this.model.set({
      blog_id: this.model.blog.escape('id'),
      post_type: options.postType
    });
  },

  events: {
    "click button.submit": "submit"
  },

  render: function(){
    var content = this.template({
      current_user: this.model.blog.owner(),
      post: this.model
    });
    this.$el.html(content);
    debugger
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$el.serializeJSON();
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
