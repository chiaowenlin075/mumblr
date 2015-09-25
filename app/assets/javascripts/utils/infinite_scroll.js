Mumblr.Mixins.InfiniteScroll = {

  bindScroll: function () {
    $(window).on("scroll", this.handleScroll.bind(this));
  },

  handleScroll: function (event) {
    event.preventDefault();
    var $doc = $(document);
    var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

    if (scrolledDist < 300) {
      this.postInfiniteScroll();
    }
  },

  postInfiniteScroll: function () {
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    this.searchResults.fetch({
      remove: false,
      data: {
        query: this.searchResults._query,
        page: this.searchResults._page + 1
      },
      success: function () {
        this.requestingNextPage = false;
        this.searchResults._page++;
      }.bind(this)
    });
  }
}
