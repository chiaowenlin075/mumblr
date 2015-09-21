json.array! @likes do |liking|
  json.partial!("api/likings/liking", liking: liking)
end
