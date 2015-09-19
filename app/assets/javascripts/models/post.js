Mumblr.Models.Post = Backbone.Model.extend({
  initialize: function(options){
    this.blog = options.blog;
  },

  urlRoot: function(){
    return _.result(this.blog, "url") + "/posts";
  },

  author: function(){
    this._author = this._author || new Mumblr.Models.User();
    return this._author;
  },

  parse: function(payload){
    if (payload.author){
      this.author().set(payload.author);
      delete payload.author
    };
    return payload;
  },

  saveImagePost: function(formData, options){
    var method = this.isNew() ? "post" : "put";
    var model = this;
    $.ajax({
      url: _.result(model, "url"),
      method: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  }

});
