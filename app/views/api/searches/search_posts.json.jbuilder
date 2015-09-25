json.posts do
  json.array! @post_results do |post|
    json.partial!(
      "api/posts/post",
      post: post,
      need_likeStatus: true,
      likings_hash: @likings_hash
    )
  end
end
json.total_count @post_results.total_count
json.total_pages @post_results.total_pages
