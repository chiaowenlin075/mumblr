class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.string :label, null: false
      t.integer :post_id, null: false
      t.integer :tagger_id, null: false
      t.timestamps null: false
    end

    add_index :taggings, :post_id
    add_index :taggings, :tagger_id
    add_index :taggings, [:post_id, :label], unique: true
  end
end
