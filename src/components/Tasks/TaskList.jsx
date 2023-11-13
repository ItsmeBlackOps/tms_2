import React, { useState, useEffect } from 'react';
import FirestoreService from '../../database/firestoreService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await FirestoreService.getAll('taskRecords');
            console.log(allTasks); // Add this line to log fetched tasks for debugging
            setTasks(allTasks); // Temporarily remove the filter to display all tasks
        };
    
        fetchTasks();
    }, []);
    
    const handleClaimTask = async (taskId) => {
        try {
            // Assuming 'currentUserId' represents the ID of the current user
            const currentUserId = 'currentUserId'; // Replace this with actual user ID logic
            await FirestoreService.update('taskRecords', taskId, { assignedTo: currentUserId });
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error claiming task:', error);
        }
    };

    return (
        <div>
            <h2>Available Tasks</h2>
            {tasks.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Task Date</th>
                            <th>Client Name</th>
                            <th>Task Type</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.taskDate}</td>
                                <td>{task.clientName}</td>
                                <td>{task.taskType}</td>
                                <td>{task.taskDescription}</td>
                                <td>
                                    <button onClick={() => handleClaimTask(task.id)}>Claim</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No available tasks to claim.</p>
            )}
        </div>
    );
};

export default TaskList;
