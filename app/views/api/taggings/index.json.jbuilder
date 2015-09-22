json.array! @taggings do |tagging|
  json.partial!("api/taggings/tagging", tagging: tagging)
end
