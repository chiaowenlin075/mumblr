Mumblr.Mixins.SaveFormData = {

  saveFormData: function(formData, options){
    var model = this;
    var method = this.isNew() ? "post" : "put";

    $.ajax({
      url: _.result(model, "url"),
      method: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options && options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options && options.error && options.error(model, resp, options);
      }
    });
  }
}
