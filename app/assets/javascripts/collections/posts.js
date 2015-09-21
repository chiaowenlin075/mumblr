Mumblr.Collections.Posts = Backbone.Collection.extend({
  model: Mumblr.Models.Post,

  url: function(){
    return _.result(this.blog, "url") + "/posts";
  }

});
