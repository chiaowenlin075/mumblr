class AddSlugToBlogs < ActiveRecord::Migration
  def change
    add_column :blogs, :slug, :string
    add_index :blogs, :slug, unique: true
  end
end
