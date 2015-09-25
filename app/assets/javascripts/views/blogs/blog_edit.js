Mumblr.Views.BlogEdit = Backbone.CompositeView.extend({
  template: JST['blogs/edit'],
  className: "edit-blog",

  initialize: function(){
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "click button.close": "exit",
    "click .icon-edit": "edit",
    "blur .editable": "update",
    "change .upload": "backgroundPreview",
    "click .submit": "save"
  },

  render: function(){
    var content = this.template({ blog: this.model });
    this.$el.html(content);
    return this;
  },

  edit: function(event){
    event.preventDefault();
    $(event.currentTarget).siblings().andSelf().not("label").toggleClass("hide");
    var $inputArea = $(event.currentTarget).next();
    $inputArea.focus();
  },

  update: function(event){
    event.preventDefault();
    var $inputArea = $(event.currentTarget);
    var input = $inputArea.serializeJSON();
    this.model.save(input.blog, {
      success: function(model){
        $inputArea.siblings().not("label").toggleClass("hide");
        $inputArea.addClass("hide");
      }.bind(this)
    })
  },

  backgroundPreview: function(event){
    this.imagePreview(
      event,
      ".background-preview",
      this.updateBackground.bind(this)
    )
  },

  updateBackground: function(file){
    var input = this.$(".blog-modal-form").serializeJSON().blog;
    var formData = new FormData();
    formData.append("blog[title]", input.title);
    formData.append("blog[description]", input.description);
    formData.append("blog[url]", input.url);
    formData.append("blog[background]", file);
    this.model.saveFormData(formData);
  },

  exit: function(event){
    event.preventDefault();
    this.remove();
  }
});

_.extend(Mumblr.Views.BlogEdit.prototype, Mumblr.Mixins.ImageUploadView);
