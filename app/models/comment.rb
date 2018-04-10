class Comment < ApplicationRecord
  scope :gist_row_nil, -> { where(gist_row: nil) }
  validates :body, presence: true
  belongs_to :user
  belongs_to :content
end
