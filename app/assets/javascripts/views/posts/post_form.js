Mumblr.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],

  initialize: function(options){
    this.collection = options.collection;
  },

  events: {
    "click button.submit": "submit"
  },

  render: function(){
    var content = this.template({
      post: this.model
    });
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$el.serializeJSON();
    if (Object.keys(input.post).length)
    this.model.save(input.post, {
      success: function(model){
        this.collection.add(model);
        this.remove();
      }.bind(this)
    });
  }
});
