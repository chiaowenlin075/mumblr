class AddAttachmentBackgroundToBlogs < ActiveRecord::Migration
  def self.up
    change_table :blogs do |t|
      t.attachment :background
    end
  end

  def self.down
    remove_attachment :blogs, :background
  end
end
