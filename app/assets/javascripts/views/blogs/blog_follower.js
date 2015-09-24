Mumblr.Views.BlogsFollower = Backbone.CompositeView.extend({
  template: JST['blogs/followers'],
  className: "followers",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addFollowers: function(collection){
    collection.forEach(function(model){
      var followerItemView = new Mumblr.Views.BlogsFollowerItem({ model: model });
      this.addSubview(".followers-index", followerItemView);
    }.bind(this));
  }

});
