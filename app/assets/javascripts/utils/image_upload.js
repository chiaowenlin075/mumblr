Mumblr.Mixins.ImageUploadView = {

  imagePreview: function(event, selector, callback){
    event.preventDefault();
    var file = this.$(".upload")[0].files[0];
    var reader  = new FileReader();

    reader.onloadend = function(){
      this._updatePreview(selector, reader.result);
      callback && callback(file)
    }.bind(this);
    file ? reader.readAsDataURL(file) : this._updatePreview(selector, "");
  },

  _updatePreview: function(selector, src){
    this.$(selector).attr("src", src);
  }
}
