# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def generate_number
  digits = (0..9).to_a
  number = digits.shuffle.join[0..3]
end

if Project.count === 0
  5.times { Project.create(name: 'Project ' + generate_number) }

  project_ids = Project.pluck :id

  15.times do
    Task.create(
      name: 'Task ' + generate_number,
      isDone: false,
      deadline: Time.new.strftime('%F'),
      priority: rand(5),
      project_id: project_ids[rand(project_ids.length)],
    )
  end
end
