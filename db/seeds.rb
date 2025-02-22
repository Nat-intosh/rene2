# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'json'

file_path = Rails.root.join('db', 'emojis.json')
emojis = JSON.parse(File.read(file_path))

emojis.each do |emoji|
  Emoji.create!(
    name: emoji["name"],
    image: emoji["image"],
    category: emoji["category"]
  )
end


file_path = Rails.root.join('db', 'paintings.json')
paintings = JSON.parse(File.read(file_path))

paintings.each do |painting|
  Painting.create!(
    name: painting["name"],
    image: painting["image"],
    rebus: painting["rebus"],
    date: painting["date"],
    author: painting["author"]
  )
end
