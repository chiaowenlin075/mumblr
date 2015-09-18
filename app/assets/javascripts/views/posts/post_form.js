Mumblr.Views.PostForm = Backbone.View.extend({
  template: JST['posts/post_form'],
  className: "new-post",

  initialize: function(options){
    this.collection = this.model.blog.posts();
    this.model.set({
      blog_id: this.model.blog.escape('id'),
      post_type: options.postType
    });
  },

  events: {
    "click button.close": "exit", //why it still work even without this event handler?
    "change .upload": "imagePreview",
    "click button.submit": "submit"
    // "keydown .post-form": "enabledSubmit"
  },

  render: function(){
    var content = this.template({
      user: this.model.blog.owner(),
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

  // detectLink: function(){
  //   this.$(".input-link")
  // },

  exit: function(event){
    event.preventDefault();
    this.remove();
  },

  submit: function(event){
    event.preventDefault();
    if (this.model.escape('post_type') === "image"){
      this.postImage();
      return;
    };
    var input = this.$(".post-form").serializeJSON();
    // if (Object.keys(input.post).length)
    //  validate input!!

    this.model.save(input.post, {
      success: function(model){
        this.collection.add(model);
        this.remove();
      }.bind(this)
    });
  },

  postImage: function(){
    var file = this.$(".upload")[0].files[0];

    var formData = new FormData();
    formData.append("post[image]", file);
    formData.append("post[body]", this.$("textarea").val());

    $.ajax({
      url: this.model.url,
      method: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: function(model){
        debugger
        this.collection.add(model);
        this.remove();
      }.bind(this),
      error: function(model, resp){
        debugger
      }.bind(this)
    });
  }
});
