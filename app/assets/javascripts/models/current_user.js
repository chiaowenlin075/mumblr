Mumblr.Models.CurrentUser = Backbone.Model.extend({
  url: "/api/users/current_user_show",

  recent_tags: function(){

  },

  parse: function(payload){
    if (payload.recent_tags){
      this.recent_tags().set(payload.recent_tags);
      delete payload.recent_tags;
    };

    if (payload.blog_id){
      this.blog_id = payload.blog_id;
      delete payload.blog_id;
    }
    return payload;
  }

});
