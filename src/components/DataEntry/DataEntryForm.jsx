import React, { useState } from 'react';
import FirestoreService from '../../database/firestoreService';

const DataEntryForm = () => {
    const [taskRecord, setTaskRecord] = useState({
        taskDate: '',
        clientName: '',
        taskType: '',
        taskDescription: '',
        assignedTo: '',
        estimatedDuration: '',
        priority: '',
        specialRequirements: '',
        status: 'Pending'
    });

    const taskTypes = ['Consulting', 'Development', 'Support', 'Training']; // Example task types
    const priorityOptions = ['Low', 'Medium', 'High']; // Example priority options
    const statusOptions = ['Pending', 'In Progress', 'Completed']; // Example statuses

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await FirestoreService.add('taskRecords', taskRecord);
            setTaskRecord({
                taskDate: '',
                clientName: '',
                taskType: '',
                taskDescription: '',
                assignedTo: '',
                estimatedDuration: '',
                priority: '',
                specialRequirements: '',
                status: 'Pending'
            });
        } catch (error) {
            // Handle errors
        }
    };

    const handleChange = (e) => {
        setTaskRecord({ ...taskRecord, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Task Date:
                <input
                    type="date"
                    name="taskDate"
                    value={taskRecord.taskDate}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Client Name:
                <input
                    type="text"
                    name="clientName"
                    value={taskRecord.clientName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Task Type:
                <select name="taskType" value={taskRecord.taskType} onChange={handleChange}>
                    <option value="">Select a Task Type</option>
                    {taskTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Task Description:
                <textarea
                    name="taskDescription"
                    value={taskRecord.taskDescription}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Assigned To:
                <input
                    type="text"
                    name="assignedTo"
                    value={taskRecord.assignedTo}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Estimated Duration (hours):
                <input
                    type="number"
                    name="estimatedDuration"
                    value={taskRecord.estimatedDuration}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Priority:
                <select name="priority" value={taskRecord.priority} onChange={handleChange}>
                    <option value="">Select Priority</option>
                    {priorityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Special Requirements:
                <textarea
                    name="specialRequirements"
                    value={taskRecord.specialRequirements}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Status:
                <select name="status" value={taskRecord.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default DataEntryForm;