Mumblr.Models.CurrentUser = Backbone.Model.extend({
  url: "/api/users/current_user_show",

  recent_tags: function(){

  },

  parse: function(payload){
    if (payload.recent_tags){
      this.recent_tags().set(payload.recent_tags);
      delete payload.recent_tags;
    };
    return payload;
  }

});
