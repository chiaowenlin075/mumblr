(function() { this.JST || (this.JST = {}); this.JST["header"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<span class="logo">m</span>\n<input type="text" class="search-bar" placeholder="Search Tumblr">\n<i class="icon-search"></i>\n\n<ul class="header-navbar">\n  <li>\n    <a href="#" class="redir-dashboard" title="Go To Dashboard"><i class="icon-home"></i></a>\n  </li>\n  <li class="to-user-list"><i class="icon-user"></i>\n    <ul class="user-nav-list">\n      <li>ACCOUNT<span class="log-out">Log Out</span></li>\n      <li><a href="#blog/',  _.result(user, "blog_id") ,'"><i class="icon-point-right"></i>Your Blog</a></li>\n      <li><a href="#likes"><i class="icon-heart-small"></i>Likes<span>',  user.likedPosts().length ,'</span></a></li>\n      <li><a href="#following"><i class="icon-following-small"></i>Following<span>',  user.followedBlogs().length ,'</span></a></li>\n      <li><a href="#setting"><i class="icon-setting-small"></i>Edit Account Info</a></li>\n    </ul>\n  </li>\n</ul>\n');}return __p.join('');};
}).call(this);
