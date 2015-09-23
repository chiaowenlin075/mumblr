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
    $(event.currentTarget).addClass("hide");
    $(event.currentTarget).prev().addClass("hide");
    var $inputArea = $(event.currentTarget).next().removeClass("hide");
    $inputArea.focus();
    // debugger
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

  _updatePreview: function(src){
    this.$(".background-preview").attr("src", src);
  },

  updateBackground: function(file){
    var input = this.$(".blog-modal-form").serializeJSON().blog;
    var formData = new FormData();
    formData.append("blog[title]", input.title);
    formData.append("blog[description]", input.description);
    formData.append("blog[background]", file);
    this.model.saveBackground(formData);
  },

  exit: function(event){
    event.preventDefault();
    this.remove();
  },

});
