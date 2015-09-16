Mumblr.Collections.Posts = Backbone.Collection.extend({
  model: Mumblr.Models.Post,
  initialize: function(options){
    this.blog = options.blog;
  },
  url: function(){
    // in case this.blog is instance of CurrentUserBlog
    return "/api/blogs/" + this.blog.escape('id') + "/posts";
  }

});
