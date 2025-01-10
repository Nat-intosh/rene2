# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_01_10_083553) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "emojis", force: :cascade do |t|
    t.string "name"
    t.text "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "paintings", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.text "image"
    t.string "date"
    t.text "rebus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "painting_id", null: false
    t.bigint "emoji1_id", null: false
    t.bigint "emoji2_id", null: false
    t.bigint "emoji3_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["emoji1_id"], name: "index_questions_on_emoji1_id"
    t.index ["emoji2_id"], name: "index_questions_on_emoji2_id"
    t.index ["emoji3_id"], name: "index_questions_on_emoji3_id"
    t.index ["painting_id"], name: "index_questions_on_painting_id"
  end

  add_foreign_key "questions", "emojis", column: "emoji1_id"
  add_foreign_key "questions", "emojis", column: "emoji2_id"
  add_foreign_key "questions", "emojis", column: "emoji3_id"
  add_foreign_key "questions", "paintings"
end
