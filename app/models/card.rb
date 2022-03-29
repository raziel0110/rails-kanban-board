class Card < ApplicationRecord
  belongs_to :column

  validates :title, :column_id, presence: true
end
