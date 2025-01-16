class AddCategoryToEmojis < ActiveRecord::Migration[8.0]
  def change
    add_column :emojis, :category, :string
    add_index :emojis, :category
  end
end
