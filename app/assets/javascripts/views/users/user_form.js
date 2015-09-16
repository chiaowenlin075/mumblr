Mumblr.Views.UserNewForm = Backbone.View.extend({
  template: JST['users/signup_form'],
  className: "user-auth",
  tagName: "section",

  initialize: function(){
    this.listenTo(this.model, "remove change destroy", this.render);
  },

  events: {
    "click button.submit": "submit"
  },

  render: function(){
    var content = this.template({
      post: this.model,
      user: this.model.author()
    });

    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$(".user-auth-form").serializeJSON();

  }

});
