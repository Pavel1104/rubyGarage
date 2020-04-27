import React from 'react'
import axios from 'axios'
export const DebugData = (props) => {
  const { title, data } = props

  return (
    <div>
      <strong>{title}</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const projectsService = {
  load: async function getProjects() {
    try {
      const response = await axios.get('/projects.json')
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  create: async function createProject(params) {
    try {
      const response = await axios.post(`/projects.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  update: async function updateProject(projectID, params) {
    try {
      const response = await axios.put(`/projects/${projectID}.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  remove: async function removeProject(projectID) {
    try {
      const response = await axios.delete(`/projects/${projectID}.json`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}

export const tasksService = {
  load: async function getTasks(projectID) {
    try {
      const response = await axios.get(`/projects/${projectID}/tasks.json`)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  create: async function createTask(projectID, params) {
    try {
      const response = await axios.post(
        `/projects/${projectID}/tasks.json`,
        params,
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  update: async function updateTask(taskID, params) {
    try {
      const response = await axios.put(`/tasks/${taskID}.json`, params)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  remove: async function removeTask(taskID) {
    try {
      const response = await axios.delete(`/tasks/${taskID}.json`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
}
