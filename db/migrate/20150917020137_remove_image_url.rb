class RemoveImageUrl < ActiveRecord::Migration
  def change
    remove_column :users, :avatar_url
    remove_column :posts, :image_url
    remove_column :blogs, :background_url
  end
end
