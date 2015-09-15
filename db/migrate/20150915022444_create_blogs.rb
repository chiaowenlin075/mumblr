class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false
      t.text :description
      t.string :url
      t.string :background_url
      t.timestamps null: false
    end

    add_index :blogs, :owner_id, unique: true
  end
end
