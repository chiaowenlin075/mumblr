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
    var demoEmail = "sennacy@cat.com",
        demoPW = "sennacy",
        that = this,
        i = 0;
    var emailInterval = setInterval(function(){
      that.$("input[type='text']").val(demoEmail.slice(0, i++));
      if (i > demoEmail.length){
        clearInterval(emailInterval);
      }
    },80);

    setTimeout(function(){
      var j = 0;
      var pwInterval = setInterval(function(){
        that.$("input[type='password']").val(demoPW.slice(0, j++));
        if (j > demoPW.length){
          clearInterval(pwInterval);
          setTimeout(function(){
            that.$(".user-auth-form").trigger("submit");
          }, 600);
        };
      },80);
    }, 1300);
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
