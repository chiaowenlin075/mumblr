Mumblr.Views.SignIn = Backbone.View.extend({
  template: JST['sessions/sign_in'],
  className: "user-auth",
  tagName: "section",

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Mumblr.CurrentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit",
    "click .demo-user": "fillInDemoUser"
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().user;

    Mumblr.CurrentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: this.showError.bind(this)
    });
  },

  fillInDemoUser: function(event){
    event.preventDefault();
    this.$("input[type='text']").val("sennacy@cat.com");
    this.$("input[type='password']").val("sennacy");
    setTimeout(function(){
      this.$(".user-auth-form").trigger("submit");
    }.bind(this), 1200);
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("#dashboard", { trigger: true });
    }
  },

  showError: function(){
    this.showErrorMsg(["Invalid email and password combination!"]);
  }

});

_.extend(Mumblr.Views.SignIn.prototype, Mumblr.Mixins.ShowError);
