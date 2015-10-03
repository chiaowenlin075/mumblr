Mumblr.Views.PostForm = Backbone.CompositeView.extend({
  template: JST['posts/post_form'],
  className: "new-post",

  initialize: function(options){
    if (this.model.isNew()){
      this.blog = options.blog;
      this.collection = options.collection;
      this.model.set({
        blog_id: this.blog.escape('id'),
        post_type: options.postType
      });
    } else {
      this.addTags();
    };
  },

  events: {
    "click button.close": "exit",
    "change .upload": "updateImagePreview",
    "submit .post-form": "submit"
  },

  render: function(){
    var content = this.template({
      user: Mumblr.CurrentUser,
      post: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addTags: function(){
    this.model.taggings().forEach(function(tag){
      var tagView = new Mumblr.Views.Tag({
        model: tag,
        collection: this.model.taggings()
      });
      this.addSubview(".tags", tagView);
    }.bind(this));
  },

  updateImagePreview: function(event){
    this.$(".fileinput").addClass("hide");
    this.imagePreview(event, ".image-preview");
    this.$("textarea.hide").removeClass("hide");
  },

  exit: function(event){
    event.preventDefault();
    this.$el.parent().removeClass("editting");
    this.remove();
  },

  submit: function(event){
    event.preventDefault();
    this.$("button.submit").addClass("disabled-btn").prop("disabled", true);
    if (this.model.escape('post_type') === "image"){
      var file = this.$(".upload")[0].files[0];
      if (file) {
        var formData = new FormData();
        formData.append("post[post_type]", "image");
        formData.append("post[blog_id]", this.model.escape('blog_id'));
        formData.append("post[image]", file);
        formData.append("post[body]", this.$("textarea").val());
        formData.append("post[tags]", this.$(".new-tags").val());
        this.model.saveFormData(formData, this.saveCallback());
        return;
      }
    };

    var input = this.$(".post-form").serializeJSON();
    this.model.save(input.post, this.saveCallback());
  },

  saveCallback: function(){
    var isNewModel = this.model.isNew() ? true : false;
    return {
      success: function(model){
        if (isNewModel) {
          this.collection.add(model);
          this.blog.set("num_posts", this.blog.get("num_posts") + 1);
        }
        this.remove();
        this.$el.parent().removeClass("editting");
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

_.extend(Mumblr.Views.PostForm.prototype, Mumblr.Mixins.ImageUploadView);
