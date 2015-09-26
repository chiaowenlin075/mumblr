Mumblr.Mixins.Paginate = {

  initialize: function(){
    this._page = 1;
  },

  fetchMore: function(){
    this.fetch({ data: { page: this._page } });
  },

  changePage: function(delta){
    this._page += delta;
    this.fetchMore();
  },

  parsePageInfo: function(payload){
    if (payload.hasOwnProperty("total_count")) {
      this._totalCount = payload.total_count;
      delete payload.total_count;
    };

    if (payload.hasOwnProperty("total_pages")) {
      this._totalPages = payload.total_pages;
      delete payload.total_pages;
    };
  }

}
