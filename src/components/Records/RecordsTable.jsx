import React, { useState, useEffect } from 'react';
import FirestoreService from '../../database/firestoreService';

const RecordsTable = () => {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        clientName: '',
        taskType: '',
        assignedTo: '',
        priority: '',
        status: ''
    });


    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await FirestoreService.getAll('taskRecords');
            setTasks(allTasks.filter(task => task.assignedTo));
        };

        fetchTasks();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = (tasks) => {
        return tasks.filter(task => {
            return (
                (filters.clientName === '' || task.clientName.toLowerCase().includes(filters.clientName.toLowerCase())) &&
                (filters.taskType === '' || task.taskType === filters.taskType) &&
                (filters.assignedTo === '' || task.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())) &&
                (filters.priority === '' || task.priority === filters.priority) &&
                (filters.status === '' || task.status === filters.status)
            );
        });
    };

    const filteredTasks = applyFilters(tasks);

    const renderClaimStatus = (task) => {
        return task.assignedTo ? `Claimed by ${task.assignedTo}` : 'Unclaimed';
    };


    return (
        <div>
            <h2>Task Records</h2>
            <div className="filters">
                <label>
                    Client Name:
                    <input
                        type="text"
                        name="clientName"
                        value={filters.clientName}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Task Type:
                    <input
                        type="text"
                        name="taskType"
                        value={filters.taskType}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Assigned To:
                    <input
                        type="text"
                        name="assignedTo"
                        value={filters.assignedTo}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Priority:
                    <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <label>
                    Status:
                    <select name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Task Date</th>
                        <th>Client Name</th>
                        <th>Task Type</th>
                        <th>Description</th>
                        <th>Assigned To</th>
                        <th>Estimated Duration</th>
                        <th>Priority</th>
                        <th>Special Requirements</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.taskDate}</td>
                            <td>{task.clientName}</td>
                            <td>{task.taskType}</td>
                            <td>{task.taskDescription}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.estimatedDuration}</td>
                            <td>{task.priority}</td>
                            <td>{task.specialRequirements}</td>
                            <td>{task.status}</td>
                            <td>{renderClaimStatus(task)}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
                    };
export default RecordsTable;
                    