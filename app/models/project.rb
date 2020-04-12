class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy, inverse_of: :project

  validates :name, presence: true

  def ids
    Project.pluck(:id)
  end
end
