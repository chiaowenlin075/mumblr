Mumblr.Views.BlogsFollower = Backbone.CompositeView.extend({
  template: JST['blogs/followers'],
  className: "blog-followers",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.collection, "add", this.addFollower);
    this.collection.forEach(this.addFollower.bind(this));
  },

  render: function(){
    var content = this.template({ num_followers: this.collection.models.length });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addFollower: function(model){
    var followerItemView = new Mumblr.Views.BlogsFollowerItem({ model: model });
    this.addSubview(".followers-index", followerItemView);
  }

});
