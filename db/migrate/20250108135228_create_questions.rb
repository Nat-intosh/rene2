class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.references :painting, null: false, foreign_key: true
      t.references :emoji1, null: false, foreign_key: { to_table: :emojis }
      t.references :emoji2, null: false, foreign_key: { to_table: :emojis }
      t.references :emoji3, null: false, foreign_key: { to_table: :emojis }

      t.timestamps
    end
  end
end
