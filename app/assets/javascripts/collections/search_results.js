// Mumblr.Collections.SearchResuilts = Backbone.Collection.extend({
//       url: "/api/search",
//
//       initialize: function(){
//         this._query = "";
//         this._blogPage = 1;
//         this._postPage = 1;
//       },
//
//       search: function(query){
//         this._query = query;
//         this.fetch({
//           // this is how you pass params to Rails controller
//           data: {
//             query: query,
//             blog_page: this._blogPage,
//             post_page: this._postPage
//           }
//           // this is get request, so the data is not the body!
//         });
//       },
//
//       model: function(attr){
//         var type = attr._searchable_type;
//         delete attr._searchable_type;
//         return new Demo.Models[type](attr);
//       },
//
//       nextPage: function(typePage){
//         this[typePage] += 1;
//         this.search(this._query);
//       },
//
//       parse: function(resp){
//         this._totalPages = resp.total_pages;
//         this._totalCount = resp.total_count;
//         return resp.search_results
//       }
//     });
