class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title
      t.integer :owner_id, null: false
      t.text :description
      t.string :url
      t.timestamps null: false
    end

    add_index :blogs, :owner_id, unique: true
  end
end
