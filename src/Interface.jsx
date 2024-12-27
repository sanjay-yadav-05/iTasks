import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Tasks from './Tasks';

const Interface = () => {
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [showFinished, setShowFinished] = React.useState(false);
  const [editTask, setEditTask] = React.useState(null); // State to hold the task being edited

  // Load tasks from localStorage on component mount
  React.useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage
  const saveToLS = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Add or update a task
  const handleSave = () => {
    if (editTask) {
      // Update the task
      const updatedTasks = tasks.map(task =>
        task.id === editTask.id ? { ...task, todo: input } : task
      );
      setTasks(updatedTasks);
      saveToLS(updatedTasks);
      setEditTask(null); // Clear edit mode
    } else {
      // Add a new task
      const newTask = { id: uuidv4(), todo: input, isComplete: false };
      const updatedTasks = [newTask, ...tasks]; // Add new task to the top
      setTasks(updatedTasks);
      saveToLS(updatedTasks);
    }
    setInput(""); // Clear input field
  };

  // Toggle task completion (apply line-through when checked)
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  };

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Toggle visibility of finished tasks
  const handleShowFinishedToggle = () => {
    setShowFinished(!showFinished);
  };

  // Filter tasks based on the showFinished state
  const filteredTasks = showFinished
    ? tasks
    : tasks.filter(task => !task.isComplete);

  // Edit task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditTask(taskToEdit);
    setInput(taskToEdit.todo); // Set input to the current task's value
  };

  // Delete task
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveToLS(updatedTasks);
  };

  return (
    <div className="flex flex-col justify-start w-[90%] xl:w-[36%] lg:w-[50%] md:w-[65%] m-auto bottom-1 bg-violet-100 md:max-h-[80vh] max-h-[88vh] min-h-[50vh] p-4 rounded-xl gap-3 mt-5">
      <h1 className="text-center font-bold text-2xl">
        iTasks - Manage your todos at one place
      </h1>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg mt-2">Add a new task</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="task"
            id="task"
            value={input}
            onChange={handleChange}
            className="w-full md:w-[82%] rounded-3xl h-9"
          />
          <button
            onClick={handleSave}
            disabled={input.length <= 3}
            type="button"
            className="bg-violet-700 text-white w-full md:w-[14%] rounded-3xl h-9 font-bold"
          >
            {editTask ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={showFinished}
          onChange={handleShowFinishedToggle}
          id="showFinished"
        />
        <label htmlFor="showFinished">Show Finished</label>
      </div>
      <div className="border-b-[1px] border-black"></div>
      <h2 className="font-bold text-lg">Your Todos</h2>
      <div className="flex flex-col gap-2 overflow-auto s">
        {filteredTasks.map(item => (
          <Tasks
            key={item.id}
            item={item}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Interface;
