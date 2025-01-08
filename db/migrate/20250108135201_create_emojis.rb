class CreateEmojis < ActiveRecord::Migration[8.0]
  def change
    create_table :emojis do |t|
      t.string :name
      t.text :image

      t.timestamps
    end
  end
end
