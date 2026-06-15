class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  accepts_nested_attributes_for :ingredients

  validates :title, presence: true
  validates :video_id, uniqueness: true
  validates :ingredients, presence: true
end
