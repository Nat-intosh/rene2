class CreatePaintings < ActiveRecord::Migration[8.0]
  def change
    create_table :paintings do |t|
      t.string :name
      t.string :author
      t.text :image
      t.date :date
      t.text :rebus

      t.timestamps
    end
  end
end
