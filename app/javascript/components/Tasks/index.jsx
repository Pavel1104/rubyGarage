import React, { useEffect, useState, useRef } from 'react'
import { tasksService } from '../../API/index'
import { DebugData } from '../../API/index'
import classes from './index.module.scss'

const Tasks = (projectData) => {
  const [editableIDs, setEditable] = useState([])

  const { projectID } = projectData
  const [tasks, setTasks] = useState([])
  const initialValues = {
    name: '',
    isDone: false,
    priority: 0,
    deadline: new Date(),
  }
  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await tasksService.load(projectID)
      setTasks(tasks.sort((a, b) => b.priority - a.priority))
    }
    loadTasks()
  }, [])

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onAddTask = async (e) => {
    e.preventDefault()
    const result = await tasksService.create(projectID, {
      project_id: projectID,
      ...values,
    })
    setTasks((prev) => [...prev, result])
    setValues(initialValues)
  }

  const onSubmit = (e, id) => {
    e.preventDefault()
    setEditable((prev) => prev.filter((v) => v !== id))
    tasksService.update(
      id,
      tasks.find((v) => v.id === id),
    )
  }

  const onIsDoneChange = (id) => {
    setTasks((prev) => {
      prev.find((v) => v.id === id).isDone = !prev.find((v) => v.id === id).isDone
      tasksService.update(
        id,
        prev.find((v) => v.id === id),
      )
      return [...prev]
    })
  }

  const changePriority = (id, priority) => {
    setTasks((prev) => {
      prev.find((v) => v.id === id).priority = priority
      tasksService.update(
        id,
        prev.find((v) => v.id === id),
      )
      return [...prev].sort((a, b) => b.priority - a.priority)
    })
  }

  const onEdit = (id) => {
    setEditable((prev) => [...prev, id])
  }

  const onEditValue = (id, name, value) => {
    setTasks((prev) => {
      prev.find((v) => v.id === id)[name] = value
      return [...prev]
    })
  }

  const removeTask = (id) => {
    tasksService.remove(id)
    setTasks((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <>
      <form className={classes.taskForm} onSubmit={(e) => onAddTask(e)}>
        <div className={classes.add} />
        <input
          className={classes.title}
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
          required={true}
          placeholder="Task name"
        />
        <div className={classes.buttonsCont}>
          <button className={classes.addTask} type="submit">
            Add Task
          </button>
        </div>
      </form>

      {tasks.map((item) => {
        const { id, name, isDone, priority, deadline } = item
        const editable = editableIDs.indexOf(id) !== -1
        return (
          <form
            key={id}
            className={classes.task}
            onSubmit={(e) => onSubmit(e, id)}
          >
            <input
              type="checkbox"
              name="isDone"
              checked={isDone}
              onChange={() => onIsDoneChange(id)}
            />
            <input
              className={classes.name}
              type="text"
              name="name"
              value={name}
              onChange={(e) => onEditValue(id, 'name', e.target.value)}
              required={true}
              placeholder="Project name"
              readOnly={!editable}
            />
            <input
              className={classes.deadline}
              type="date"
              name="deadline"
              value={deadline}
              onChange={(e) => onEditValue(id, 'deadline', e.target.value)}
              placeholder="Deadline"
              readOnly={!editable}
            />
            <div className={classes.buttonsCont}>
              <div className={classes.priority}>
                <button
                  className={classes.priorityUp}
                  type="button"
                  data-tooltip={priority}
                  onClick={() => changePriority(id, priority + 1)}
                >
                  Priority up
                </button>
                <button
                  className={classes.priorityDown}
                  type="button"
                  data-tooltip={priority}
                  disabled={priority === 0}
                  onClick={(e) => changePriority(id, priority - 1)}
                >
                  Priority down
                </button>
              </div>
              <button
                className={[
                  classes.submit,
                  editable ? classes.visible : classes.hidden,
                ].join(' ')}
                type="submit"
                disabled={!editable}
              >
                Submit
              </button>

              <button
                className={[
                  classes.edit,
                  !editable ? classes.visible : classes.hidden,
                ].join(' ')}
                type="button"
                onClick={() => onEdit(id)}
                disabled={editable}
              >
                Edit
              </button>

              <button
                className={classes.delete}
                type="button"
                onClick={(e) => removeTask(id)}
              >
                Delete
              </button>
            </div>
          </form>
        )
      })}
    </>
  )
}

export default Tasks
