class Content < ApplicationRecord
  scope :content_private, -> (user) { where(is_secret: true, user: user) }
  scope :content_public, -> { where(is_secret: false) }
  validates :title, presence: true
  validates :body, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy
  enum mode: [ :default, :ruby, :javascript, :htmlmixed ]
end
