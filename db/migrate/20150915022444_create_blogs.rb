class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false
      t.text :description
      t.integer :num_follows, default: 0, null: false
      t.string :url
      t.timestamps null: false
    end

    add_index :blogs, :owner_id, unique: true
    add_index :blogs, :num_follows
  end
end
