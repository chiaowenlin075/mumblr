json.array! @followings do |following|
  json.partial!("api/followings/following", following: following)
end
