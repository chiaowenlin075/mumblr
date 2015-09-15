Backbone.CompositeView = Backbone.View.extend({
  subviews: function(){
    this._subviews = this._subviews || _({});
    return this._subviews;
  },

  addSubview: function(selector, subview, location){

  },

});
