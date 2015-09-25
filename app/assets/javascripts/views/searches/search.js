Mumblr.Views.Search = Backbone.CompositeView.extend({
  template: JST['searches/search'],
	className: "search-results",

	options: {
		searchResults: {}
	},

	initialize: function (options) {
		this.bindScroll();
    this.query = options.query;
		this.searchBlogs = new Mumblr.Collections.SearchBlogs({
      query: this.query
    });
		this.searchPosts = new Mumblr.Collections.SearchPosts({
			query: this.query
		});
		this.options.searchResults = this.searchPosts;

		this.listenTo(this.searchBlogs, "sync", this.render);
		this.listenTo(this.searchPosts, "sync", this.render);
		this.listenTo(this.searchPosts.posts(), "add", this.addPost);
	},

	events: {
		"click .blog-next-page": "blogNextPage",
		"click .blog-prev-page": "blogPrevPage"
	},

	render: function () {
		var content = this.template({
			query: this.query,
			blogsResult: this.searchBlogs,
			postsResult: this.searchPosts
		});
		this.$el.html(content);

		this.addBlogs(this.searchBlogs.blogs());
		this.attachSubviews();

		return this;
	},

	addBlogs: function(collection) {
		collection.forEach(function(model){
			var blogView = new Mumblr.Views.BlogsIndexItem({ model: model });
			this.$(".found-blogs").append(blogView.render().$el);
		}.bind(this));
	},

	addPost: function(model){
		var postView = new Mumblr.Views.PostsIndexItem({ model: model });
		this.addSubview(".found-posts", postView);
	},

	blogNextPage: function (event) {
		event.preventDefault();
		this.searchBlogs.changePage(+1);
	},

	blogPrevPage: function(event){
		event.preventDefault();
		this.searchBlogs.changePage(-1);
	}

});

_.extend(Mumblr.Views.Search.prototype, Mumblr.Mixins.InfiniteScroll);
