class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  accepts_nested_attributes_for :ingredients

  validates :title, presence: true
  validates :video_id, uniqueness: { message: "は既に投稿されています" }
  validates :ingredients, presence: { message: "を動画から取得できていません" }
end
