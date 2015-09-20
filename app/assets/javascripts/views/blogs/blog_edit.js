Mumblr.Views.BlogEdit = Backbone.CompositeView.extend({
  template: JST['blogs/edit'],
  className: "edit-blog",

  initialize: function(){
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "click button.close": "exit",
    "click .show-info": "edit"
  },

  render: function(){
    var content = this.template({ blog: this.model });
    this.$el.html(content);
    return this;
  },

  edit: function(event){
    event.preventDefault();
    $(event.currentTarget).addClass("hide");
    $(event.currentTarget).next().removeClass("hide");
    debugger
  },

  submit: function(event){
    event.preventDefault();

  },

  exit: function(event){
    event.preventDefault();
    this.remove();
  },

});
