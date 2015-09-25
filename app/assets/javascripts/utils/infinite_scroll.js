Mumblr.Mixins.InfiniteScroll = {

  options: {
    searchResults: {}
  },

  bindScroll: function () {
    $(window).on("scroll", this.handleScroll.bind(this));
  },

  handleScroll: function (event) {
    event.preventDefault();
    var $doc = $(document);
    var scrolledDist = $doc.height() - window.innerHeight - $doc.scrollTop();

    if (scrolledDist < 300) {
      this.InfiniteScroll();
    }
  },

  InfiniteScroll: function () {
    if (this.requestingNextPage) return;

    this.requestingNextPage = true;
    this.options.searchResults.fetch({
      remove: false,
      data: this.fetchData(),
      success: function () {
        this.requestingNextPage = false;
        this.options.searchResults._page++;
      }.bind(this)
    });
  },

  fetchData: function(){
    if (this.options.searchResults._query){
      return {
        query: this.options.searchResults._query,
        page: this.options.searchResults._page + 1
      };
    } else {
      return {
        page: this.options.searchResults._page + 1
      };
    };
  }

}
