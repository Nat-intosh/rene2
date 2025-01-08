class Question < ApplicationRecord
  belongs_to :painting
  belongs_to :emoji1, class_name: 'Emoji'
  belongs_to :emoji2, class_name: 'Emoji'
  belongs_to :emoji3, class_name: 'Emoji'
end
