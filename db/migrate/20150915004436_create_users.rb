class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :username, null: false
      t.boolean :activated, null: false, default: false
      t.string  :activation_token, null: false
      t.string :avatar_url
      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
  end
end
