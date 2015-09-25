Mumblr.Mixins.InfiniteScroll = {

  options: {
    searchResults: {}
  },

  searchResults: function(){
    return this.options.searchResults;
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
    if (this.searchResults()._totalPages === this.searchResults()._page) {
      $(window).off("scroll");
      return;
    };

    this.requestingNextPage = true;
    this.searchResults().fetch({
      remove: false,
      data: this.fetchData(),
      success: function () {
        this.requestingNextPage = false;
        this.searchResults()._page++;
      }.bind(this)
    });
  },

  fetchData: function(){
    if (this.searchResults()._query){
      return {
        query: this.searchResults()._query,
        page: this.searchResults()._page + 1
      };
    } else {
      return {
        page: this.searchResults()._page + 1
      };
    };
  }

}
