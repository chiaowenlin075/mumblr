Mumblr.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],
  className: "new-post",

  initialize: function(options){
    this.collection = options.collection;
    this.model.set({
      blog_id: options.blogId,
      post_type: options.postType
    });
  },

  events: {
    "click button.close": "exit", //why it still work even without this event handler?
    "change .upload": "imagePreview",
    "submit .post-form": "submit"
    // "keydown .post-form": "enabledSubmit"
  },

  render: function(){
    var content = this.template({
      user: Mumblr.CurrentUser,
      post: this.model
    });
    this.$el.html(content);
    // this.$(".submit").prop("disabled", true).addClass("disabledBtn");

    return this;
  },

  enabledSubmit: function(event){
    event.preventDefault();
    // this.$(".submit").prop("disabled", false);
  },

  imagePreview: function(event){
    event.preventDefault();
    var file    = this.$(".upload")[0].files[0];
    var reader  = new FileReader();

    reader.onloadend = function(){
      this._updatePreview(reader.result);
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
    };
  },

  _updatePreview: function(src){
    this.$(".image-preview").removeClass("hide").attr("src", src);
    this.$(".upload").addClass("hide");
  },

  exit: function(event){
    event.preventDefault();
    this.remove();
  },

  submit: function(event){
    event.preventDefault();
    this.$("button.submit").addClass("disabled-btn").prop("disabled", true);
    if (this.model.escape('post_type') === "image"){
      var file = this.$(".upload")[0].files[0];
      var formData = new FormData();
      formData.append("post[post_type]", "image");
      formData.append("post[blog_id]", this.model.escape('blog_id'));
      formData.append("post[image]", file);
      formData.append("post[body]", this.$("textarea").val());
      this.model.saveImagePost(formData, this.saveCallback());
      return;
    };

    var input = this.$(".post-form").serializeJSON();
    this.model.save(input.post, this.saveCallback());
  },

  saveCallback: function(){
    return {
      success: function(model){
        this.collection.add(model);
        this.remove();
      }.bind(this),
      error: function(model, resp){
        this.$("button.submit").removeClass("disabled-btn").prop("disabled", false);
        this.$("input").val("");
        var errMsg = resp.responseJSON[0];
        var $err = $("<strong class='error-msg'>").html(errMsg);
        this.$(".error").html($err);
      }.bind(this)
    };
  }

});
