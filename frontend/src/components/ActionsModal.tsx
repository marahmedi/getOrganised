import React from 'react'
import {Task} from "../interfaces"

interface ActionsModalProps {
    notes: string;
    taskId: number;
    tasks: Task[];
    setTasks: (value: Task[]) => void;
    setActiveTaskIndex: (value: number|null) => void;
}

const ActionsModal: React.FC<ActionsModalProps>  = ({notes, taskId, tasks, setTasks, setActiveTaskIndex}) => {

    const deleteTask = async (taskId: number): Promise<void> => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (!confirmed) return;
    
        try {
          const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            setTasks(tasks.filter(task => task.task_id !== taskId));
        setActiveTaskIndex(null); // Close the modal if it was open
          } else {
            console.error('Failed to delete the task');
          }
        } catch (error) {
          console.error('Error deleting the task:', error);
        }
      };

  return (
    <div className='bg-white w-100 h-[5rem] mb-4 px-5 rounded-l flex justify-between items-center '>
      <div className='text-gray-400'>{notes === null ? "No notes for this task": notes}</div>
      <div className='text-gray-500 flex items-end flex-col '>
        <button>Edit</button>
        <button onClick={() => deleteTask(taskId)}>Delete</button>
      </div>
    </div>
  )
}

export default ActionsModal
