import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface TaskInterface {
  id: number
  title: string
  description: string
  history: { status: TaskStatus; timestamp: Date }[]
}

interface TaskState {
  title: string
  description: string
  tasks: TaskInterface[]
  selectedTask: number | null
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  addTask: (task: TaskInterface) => void
  setSelectedTask: (taskId: number | null) => void
  editTask: (updatedTask: Partial<TaskInterface>) => void
  deleteTask: (taskId: number) => void
}

// Create the Zustand store
export const useTaskStore = create<TaskState>()(
  persist(
    set => ({
      // Initial State
      title: '',
      description: '',
      tasks: [],
      selectedTask: null,

      // Actions
      setTitle: (title: string) => set({ title }),

      setDescription: (description: string) => set({ description }),

      addTask: (task: TaskInterface) =>
        set(state => ({
          tasks: [...state.tasks, task],
          title: '',
          description: '',
        })),

      setSelectedTask: (taskId: number | null) => set({ selectedTask: taskId }),

      editTask: (updatedTask: Partial<TaskInterface>) =>
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === state.selectedTask ? { ...task, ...updatedTask } : task,
          ),
        })),

      deleteTask: (taskId: number) =>
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
          selectedTask: null,
        })),
    }),
    {
      name: 'taskList', // Key for localStorage
    },
  ),
)
