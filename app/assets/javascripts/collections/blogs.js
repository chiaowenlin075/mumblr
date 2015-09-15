Mumblr.Collections.Blogs = Backbone.Collection.extend({
  url: "/api/blogs",
  model: Mumblr.Models.Blog,

  // Wont use this, we don't want to fetch ALL blogs, too slow
  getOrFetch: function(id){
    var widget = this.get(id);
    if (widget){
      widget.fetch();
    } else {
      widget = new Mumblr.Models.Blog({ id: id });
      this.add(widget);
      widget.fetch({
        error: function(model){
          this.remove(model);
        }.bing(this)
      });
    };

    return widget;
  }

});
