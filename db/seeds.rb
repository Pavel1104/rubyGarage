# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

if Project.count === 0
  projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4']
  projects.each { |item| Project.create(name: item) }
end
