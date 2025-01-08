class Emoji < ApplicationRecord
  has_many :questions_as_emoji1, class_name: 'Question', foreign_key: 'emoji1_id'
  has_many :questions_as_emoji2, class_name: 'Question', foreign_key: 'emoji2_id'
  has_many :questions_as_emoji3, class_name: 'Question', foreign_key: 'emoji3_id'
end
