Mumblr.Views.BlogsIndexItem = Backbone.CompositeView.extend({
  template: JST['blogs/index_item'],
  className: "blogs-index-item",
  tagName: "li",

  initialize: function(){
    this.listenTo(this.model, "destroy", this.render);
  },

  render: function(){
    var content = this.template({
      blog: this.model,
      owner: this.model.owner(),
      currentUser: Mumblr.CurrentUser
    });
    this.$el.html(content);
    var followWidget = new Mumblr.Views.FollowWidget({
      model: this.model
    })
    this.addSubview(".follow-status", followWidget);
    return this;
  }

});
