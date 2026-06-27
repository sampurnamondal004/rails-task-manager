class Api::V1::TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: task, status: :created
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    Task.find(params[:id]).destroy
    head :no_content
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :completed)
  end
end
