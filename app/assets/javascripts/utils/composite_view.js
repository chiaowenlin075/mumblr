Backbone.CompositeView = Backbone.View.extend({
  subviews: function(selector){
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (selector) {
      this._subviews[selector] = this._subviews[selector] || _([]);
      return this._subviews[selector];
    } else {
      return _(this._subviews);
    }
  },

  // options can have 'ord': unshife or not; 'prepend': true/false
  addSubview: function (selector, subview, prepend) {
    if (prepend) {
      this.subviews(selector).unshift(subview);
    } else {
      this.subviews(selector).push(subview);
    }
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview.render(), prepend);
  },

  attachSubview: function (selector, subview, prepend) {
     if (prepend) {
       this.$(selector).prepend(subview.$el);
     } else {
       this.$(selector).append(subview.$el);
     }
     // Bind events in case `subview` has previously been removed from
     // DOM.
     subview.delegateEvents();

     if (subview.attachSubviews) {
       subview.attachSubviews();
     }
  },

  attachSubviews: function(){
    var view = this;
    this.subviews().each(function (selectorSubviews, selector) {
      view.$(selector).empty();
      selectorSubviews.each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  eachSubview: function(callback) {
    this.subviews().each(function (selectorSubviews, selector) {
      selectorSubviews.each(function (subview) {
        callback(subview, selector);
      });
    });
  },

  onRender: function() {
    this.eachSubview(function (subview) {
      subview.onRender && subview.onRender();
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    this.eachSubview(function (subview) {
      subview.remove();
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var selectorSubviews = this.subviews(selector);
    selectorSubviews.splice(selectorSubviews.indexOf(subview), 1);
  },

  removeModelSubview: function (selector, model) {
    var selectorSubviews = this.subviews(selector);
    var i = selectorSubviews.findIndex(function (subview) {
      return subview.model === model;
    });
    if (i === -1) { return; }

    selectorSubviews.toArray()[i].remove();
    selectorSubviews.splice(i, 1);
  },

  unshiftSubview: function (selector, subview) {
    this.addSubview(selector, subview, true);
  }

});
