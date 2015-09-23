Mumblr.Mixins.ShowError = {
  showErrorMsg: function(errMsgs){
    var $ul = $("<ul class='error-msg-list'>");
    for (var i = 0; i < errMsgs.length; i++){
      var $li = $("<li class='error-msg'>").html(errMsgs[i])
      $ul.append($li);
    }
    this.$(".error").html($ul);
  }
}
