Mumblr.Models.CurrentUser = Backbone.Model.extend({
  url: "/users/current_user_show",

  blog: function(){
    this._blog = this._blog || new Mumblr.Models.Blog();
    return this._blog;
  },

  recent_tags: function(){

  },

  parse: function(payload){
    if (payload.blog){
      this.blog().set(payload.blog);
      delete payload.blog;
    };
    if (payload.recent_tags){
      this.recent_tags().set(payload.recent_tags);
      delete payload.recent_tags;
    };
    return payload;
  }

});
