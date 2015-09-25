Mumblr.Collections.SearchPosts = Backbone.Collection.extend({
      url: "/api/search_posts",
      model: Mumblr.Models.Post,

      initialize: function(options){
        this._query = options.query;
        this._page = 1;
        this.search();
      },

      search: function(){
        this.fetch({
          data: {
            query: this._query,
            page: this._page
          }
        });
      },

      changePage: function(delta){
        this._page += delta;
        this.search();
      },

      posts: function(){
        this._posts = this._posts || new Mumblr.Collections.Posts();
        return this._posts;
      },

      parse: function(payload){
        if (payload.hasOwnProperty("total_count")) {
          this._totalCount = payload.total_count;
          delete payload.total_count;
        };

        if (payload.hasOwnProperty("total_pages")) {
          this._totalPages = payload.total_pages;
          delete payload.total_pages;
        };

        if (payload.posts) {
          this.posts().set(payload.posts, { parse: true });
        };

        return payload
      }
    });
