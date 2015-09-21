class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likings do |t|
      t.integer :post_id, null: false
      t.integer :liker_id, null: false
      t.timestamps null: false
    end

    add_index :likings, :post_id
    add_index :likings, :liker_id
    add_index :likings, [:post_id, :liker_id]
  end
end
