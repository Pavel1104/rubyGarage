json.extract! task, :id, :name, :isDone, :deadline, :priority, :project_id, :created_at, :updated_at
json.url task_url(task, format: :json)
