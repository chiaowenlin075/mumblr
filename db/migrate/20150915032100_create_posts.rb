class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.integer :blog_id, null: false
      t.string :post_type, null: false
      t.string :title
      t.text :body
      t.string :image_url
      t.string :link_url
      t.timestamps null: false
    end

    add_index :posts, :author_id
    add_index :posts, :blog_id
  end
end
