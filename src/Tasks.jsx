import React from 'react';

const Tasks = ({ item, onToggleComplete, onEdit, onDelete }) => {
    const handleDelete = () => {
        onDelete(item.id); // Delete task by its ID
    };

    const handleEdit = () => {
        onEdit(item.id); // Trigger edit for the task
    };

    return (
        <div className="flex justify-between bottom-1 border-violet-700 h-auto gap-4 box-border">
            <div className="max-w-[75%] overflow-hidden flex gap-2 items-center">
                <input
                    type="checkbox"
                    onChange={() => onToggleComplete(item.id)} // Toggle completion on checkbox change
                    checked={item.isComplete}
                    name="done"
                    id="done"
                />
                <span
                    className={`text-wrap break-words ${item.isComplete ? 'line-through' : ''}`} // Apply line-through when isComplete is true
                >
                    {item.todo}
                </span>
            </div>
            <div className="md:w-[25%] w-[10%] flex gap-2 items-center justify-end">
                <img
                    onClick={handleEdit}
                    className="block sm:hidden  max-h-5"
                    src="src/assets/edit.svg"
                    alt="Edit"
                />
                <img
                    onClick={handleDelete}
                    className="block sm:hidden  max-h-5"
                    src="src/assets/delete.svg"
                    alt="Delete"
                />
                <button
                    onClick={handleEdit}
                    className="bg-violet-700 text-white hidden sm:block px-2 xl:text-[.85em] text-[.8em] rounded-lg py-1"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-violet-700 text-white hidden sm:block px-2 xl:text-[.85em] text-[.8em] rounded-lg py-1"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Tasks;
