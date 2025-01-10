class ChangeDateTypeInPaintings < ActiveRecord::Migration[8.0]
  def change
    change_column :paintings, :date, :string
  end
end
