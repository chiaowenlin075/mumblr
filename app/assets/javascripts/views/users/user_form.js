Mumblr.Views.UserForm = Backbone.View.extend({
  template: JST['users/signup_form'],
  className: "user-auth",
  tagName: "section",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
    "click button.submit": "submit"
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var input = this.$(".user-auth-form").serializeJSON().user;
    this.model.save(input, {
      success: function(){
        Mumblr.CurrentUser.fetch();
        Backbone.history.navigate("posts", { trigger: true });
      },
      error: function(model, resp){
        this.showErrorMsg(resp.responseJSON);
      }.bind(this)
    });
  },

  showErrorMsg: function(errMsgs){
    var $ul = $("<ul class='error-msg-list'>");
    for (var i = 0; i < errMsgs.length; i++){
      var $li = $("<li class='error-msg'>").html(errMsgs[i])
      $ul.append($li);
    }
    this.$(".error").html($ul);
  }

});
