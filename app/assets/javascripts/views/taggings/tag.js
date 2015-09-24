Mumblr.Views.Tag = Backbone.View.extend({
  template: JST["taggings/tag"],
  className: "tag",

  events: {
    "click span.delete": "delete"
  },

  initialize: function(options){
    this.collection = options.collection;
  },

  render: function () {
    var content = this.template({ tag: this.model });
    this.$el.html(content);
    return this;
  },

  delete: function (event) {
    event.preventDefault();
    if (Mumblr.CurrentUser.escape('id') === this.model.escape('tagger_id')){
      debugger
      this.collection.remove(this.model);
      this.model.destroy;
      this.remove();
    };
  }

});
