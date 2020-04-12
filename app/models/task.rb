class Task < ApplicationRecord
  belongs_to :project

  validates :priority,
            numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :name, presence: true
  validates :project, presence: true
  # validates :project, absence: true
  validates :project_id,
            inclusion: {
              in: Project.ids,
              message:
                'id %{value} is not valid. It should be one of ' +
                  Project.ids.join(', ')
            }
end
