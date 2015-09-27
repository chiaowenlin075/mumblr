Mumblr.Views.BlogsFollowerItem = Backbone.CompositeView.extend({
  template: JST["blogs/follower_item"],
  className: "follower",
  tagName: "li",

  render: function(){
    var content = this.template({ follower: this.model });
    this.$el.html(content)
    this.attachSubviews();
    return this;
  }
})
