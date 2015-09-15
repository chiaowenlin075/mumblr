Mumblr.Models.Post = Backbone.Model.extend({
  initialize: function(options){
    this.blog = options.blog;
  },

  urlRoot: function(){
    return this.blog.url() + "/posts";
  }


});
