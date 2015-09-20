Mumblr.Views.BlogEdit = Backbone.CompositeView.extend({
  template: JST['blogs/edit'],
  className: "edit-blog",

  initialize: function(){
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "click button.close": "exit",
    "click .icon-edit": "edit",
    "blur .editable": "update"
  },

  render: function(){
    debugger
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
      }.bind(this),
      error: function(model, resp){
        debugger
        // var errMsg = resp.responseJSON[0];
        // var $err = $("<strong class='error-msg'>").html(errMsg);
        // $inputArea.parent().append($err);
        // $inputArea.focus();
        debugger
      }
    })
  },

  exit: function(event){
    event.preventDefault();
    this.remove();
  },

});
