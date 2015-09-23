Mumblr.Views.UserEditForm = Backbone.View.extend(
  _.extend({}, Mumblr.Mixins.ImageUploadView, {
    template: JST['users/edit_form'],
    className: "user-edit group",
    tagName: "form",

    initialize: function(){
      this.listenTo(this.model, "sync change", this.render);
    },

    events: {
      "click button.submit": "submit",
      "click .icon-edit": "edit",
      "blur .editable": "updateInfo",
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

    updateInfo: function(event){
      event.preventDefault();
      var $inputArea = $(event.currentTarget);
      $inputArea.parent().find(".show-info").text($inputArea.val());
      $inputArea.siblings().andSelf().toggleClass("hide");
      this.model.save(input.user, {
        success: function(model){
          $inputArea.siblings().andSelf().toggleClass("hide");
        }.bind(this),
        error: function(model, resp){
          debugger
          this.$("button.submit").removeClass("disabled-btn").prop("disabled", false);
          this.$("input").val("");
          var errMsg = resp.responseJSON;
          this.showErrorMsg(errMsgs)
        }
      })
    },

    submit: function(event){
      event.preventDefault();
      // maybe just remove the view, you already save before this
    },

    showErrorMsg: function(errMsgs){
      var $ul = $("<ul class='error-msg-list'>");
      for (var i = 0; i < errMsgs.length; i++){
        var $li = $("<li class='error-msg'>").html(errMsgs[i])
        $ul.append($li);
      }
      this.$(".error").html($ul);
    }
  })
)
