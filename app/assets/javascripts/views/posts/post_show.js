Mumblr.Views.PostShow = Backbone.CompositeView.extend({
  template: JST['posts/show'],
  className: "post",
  tagName: "article",

  initialize: function(){
    this.listenTo(this.model, "change destroy", this.render);
    this.listenTo(this.model.taggings(), "add remove", this.render);
  },

  events: {
    "click .edit-post": "edit",
    "click .delete-post": "confirmDeleteModal",
    "click button.delete": "delete",
    "click button.close": "exit"
  },

  render: function(){
    var content = this.template({
      post: this.model,
      currentUser: Mumblr.CurrentUser
    });
    this.$el.html(content);
    if (this.$(".like-status").length) {
      var likeWidget = new Mumblr.Views.LikeWidget({
        model: this.model
      })
      this.addSubview(".like-status", likeWidget);
    };
    return this;
  },

  edit: function(event){
    event.preventDefault();
    var postEditForm = new Mumblr.Views.PostForm({ model: this.model });
    this.$el.append(postEditForm.render().$el).addClass("editting");
  },

  confirmDeleteModal: function(event){
    event.preventDefault();
    this.$(".delete-modal").removeClass("invisible");
  },

  delete: function(event){
    event.preventDefault();
    if (Mumblr.CurrentUser.escape('id') !== this.model.author().escape('id')){
      return;
    };
    this.model.destroy();
    this.remove();
  },

  exit: function(event){
    event.preventDefault();
    this.$(".delete-modal").addClass("invisible");
  }

});
