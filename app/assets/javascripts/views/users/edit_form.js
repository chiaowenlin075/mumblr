Mumblr.Views.UserEditForm = Backbone.View.extend({
  template: JST['users/edit_form'],
  className: "user-edit group",
  tagName: "form",

  initialize: function(){
    this.model = Mumblr.CurrentUser;
    this.username = this.model.escape('username');
    this.listenTo(this.model, "sync change", this.render);
  },

  events: {
    "submit": "submit",
    "click .icon-edit": "edit",
    "blur .editable": "showUpdateInfo",
    "change .upload": "avatarPreview"
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  edit: function(event){
    event.preventDefault();
    $(event.currentTarget).siblings().andSelf().toggleClass("hide");
    $(event.currentTarget).parent().find(".editable").focus();
  },

  avatarPreview: function(event){
    this.imagePreview(event, ".avatar-preview");
  },

  showUpdateInfo: function(event){
    event.preventDefault();
    var $inputArea = $(event.currentTarget);
    $inputArea.siblings().andSelf().toggleClass("hide");
    if ($inputArea.is(":password")) { return };
    if ($inputArea.val() === "") { return };
    $inputArea.parent().find(".show-info").text($inputArea.val());
  },

  updateAvatar: function(input, file){
    var formData = new FormData();
    formData.append("user[username]", input.username);
    if (!input.password){
      formData.append("user[password]", input.password);
    }
    formData.append("user[avatar]", file);
    this.model.saveFormData(formData, {
      success: function(model){
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  submit: function(event){
    event.preventDefault();
    this.$("button.submit").addClass("disabled-btn")
                           .text("Saving")
                           .prop("disabled", true);
    var input = this.$el.serializeJSON().user;
    var file = this.$(".upload")[0].files[0];
    var that = this;
    if (!input.password){ delete input.password }
    if (file) {
      that.updateAvatar(input, file)
    } else {
      that.model.save(input, {
        success: function(model){
          Backbone.history.navigate("", { trigger: true });
        },
        error: function(model, resp){
          that.$("button.submit").removeClass("disabled-btn")
                                 .text("Save")
                                 .prop("disabled", false);
          var errMsgs = resp.responseJSON;
          that.showErrorMsg(errMsgs)
          that.$(".username").val(that.username);
          that.$(".username").parent().find(".show-info").text(that.username);
        }
      });
    };
  }

});

_.extend(Mumblr.Views.UserEditForm.prototype, Mumblr.Mixins.ImageUploadView);
_.extend(Mumblr.Views.UserEditForm.prototype, Mumblr.Mixins.ShowError);
