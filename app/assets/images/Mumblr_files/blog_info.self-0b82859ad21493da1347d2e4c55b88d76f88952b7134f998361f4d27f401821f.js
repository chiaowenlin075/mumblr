(function() { this.JST || (this.JST = {}); this.JST["blogs/blog_info"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<b>',  user.escape('username') ,'</b>\n<a href="#blog/',  blog.escape('id') ,'">',  blog.escape('title') ? blog.escape('title') : "Untitled" ,'</a>\n<ul class="blog-info-list">\n  <li><a href="#posts" class="blog-info-link">Posts<span>',  blog.get("num_posts") ,'</span></a></li>\n  <li><a href="#followers" class="blog-info-link">Followers<span>',  blog.get("num_follows") ,'</span></a></li>\n  <li>Recent tags<ul class="recent-tags">\n    ');  _.result(user, "recentTags").forEach(function(tag){ ; __p.push('\n      <li><a href="#search?=',  tag.slice(1) ,'">',  tag ,'</a></li>\n    ');  }) ; __p.push('\n  </ul></li>\n</ul>\n');}return __p.join('');};
}).call(this);