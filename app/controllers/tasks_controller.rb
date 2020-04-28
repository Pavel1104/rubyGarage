class TasksController < ApplicationController
  before_action :set_task, only: %i[show edit update destroy]
  before_action :find_project, only: %i[index new create]
  before_action :get_project, only: %i[show edit update destroy]

  # GET projects/:id/tasks
  # GET projects/:id/tasks.json
  def index
    @tasks = @project.tasks.order(id: :asc)
    respond_to do |format|
      format.html {render'projects/show'}
      format.json
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show; end

  # GET projects/:id/tasks/new
  def new
    # @task = Task.new
    @task = @project.tasks.new
  end

  # GET /tasks/1/edit
  def edit; end

  # POST projects/:id/tasks
  # POST projects/:id/tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        format.html do
          redirect_to @task,
                      notice: 'Task was successfully created.'
        end
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html do
          redirect_to @task, notice: 'Task was successfully updated.'
        end
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html do
        redirect_to project_tasks_url(@project.id),
                    notice: 'Task was successfully destroyed.'
      end
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.require(:task).permit(
      :name,
      :isDone,
      :deadline,
      :priority,
      :project_id
    )
  end

  def find_project
    @project = Project.find (params[:project_id])
  end

  def get_project
    @project = @task.project
  end
end
