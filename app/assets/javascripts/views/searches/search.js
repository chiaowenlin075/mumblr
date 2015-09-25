Mumblr.Views.Search = Backbone.CompositeView.extend({
  template: JST['searches/search'],
	className: "search-results",

	initialize: function (options) {
		this.bindScroll();
    this.query = options.query;
		this.searchBlogs = new Mumblr.Collections.SearchBlogs({
      query: this.query
    });
		this.searchPosts = new Mumblr.Collections.SearchPosts({
			query: this.query
		});

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

	blogNextPage: function (event) {
		event.preventDefault();
		this.searchBlogs.changePage(+1);
	},

	blogPrevPage: function(event){
		event.preventDefault();
		this.searchBlogs.changePage(-1);
	},

	postInfiniteScroll: function () {
		if (this.requestingNextPage) return;

		this.requestingNextPage = true;
		this.searchPosts.fetch({
			remove: false,
			data: {
				query: this.searchPosts._query,
				page: this.searchPosts._page + 1
			},
			success: function () {
				this.requestingNextPage = false;
				this.searchPosts._page++;
			}.bind(this)
		});
	}

});
