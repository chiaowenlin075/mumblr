Mumblr.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  // overwrite to send password
  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }

});
