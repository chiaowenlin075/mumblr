Mumblr.Collections.Posts = Backbone.Collection.extend({
  model: Mumblr.Models.Post,
  initialize: function(options){
    this.blog = options.blog;
  },

  url: function(){
    return _.result(this.blog, "url") + "/posts";
  }

});
