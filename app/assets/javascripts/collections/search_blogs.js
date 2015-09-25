Mumblr.Collections.SearchBlogs = Backbone.Collection.extend({
      url: "/api/search_blogs",
      model: Mumblr.Models.Blog,

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

      blogs: function(){
        this._blogs = this._blogs || new Mumblr.Collections.Blogs();
        return this._blogs;
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

        if (payload.blogs) {
          this.blogs().set(payload.blogs, { parse: true });
          delete payload.blogs
        };

        return payload
      }

    });
