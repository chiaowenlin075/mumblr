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

    updateInfo: function(event){
      event.preventDefault();
      var $inputArea = $(event.currentTarget);
      $inputArea.parent().find(".show-info").text($inputArea.val());
      $inputArea.siblings().andSelf().toggleClass("hide");
    },

    submit: function(event){
      event.preventDefault();
      var input = this.$el.serializeJSON().user;
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

    avatarPreview: function(event){
      event.preventDefault();
      var file = this.$(".upload")[0].files[0];
      var reader  = new FileReader();

      reader.onloadend = function(){
        this._updatePreview(reader.result);
        this.updateBackground(file);
      }.bind(this);

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this._updatePreview("");
      };
    },

    _updatePreview: function(section, src){
      this.$(".background-preview").attr("src", src);
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
