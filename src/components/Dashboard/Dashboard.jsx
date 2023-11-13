import React, { useEffect, useState } from 'react';
import FirestoreService from '../../database/firestoreService';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [recentRecords, setRecentRecords] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);

    useEffect(() => {
        const fetchRecentRecords = async () => {
            const records = await FirestoreService.getAll('taskRecords'); // Assuming 'serviceRecords' is your collection name
            setRecentRecords(records.slice(0, 5)); // Getting the latest 5 records
        };

        const fetchUpcomingTasks = async () => {
            const tasks = await FirestoreService.getAll('taskRecords'); // Assuming 'tasks' is your collection name
            setUpcomingTasks(tasks); // Update based on your logic to find upcoming tasks
        };

        fetchRecentRecords();
        fetchUpcomingTasks();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <Link to="/data-entry">Go to Data Entry Form</Link>
            <Link to="/records">Go to Records</Link>
            <Link to="/tasks">Go to Task</Link>
            <Link to="/report-generator">Go to Reports</Link>

            <section>
                <h3>Recent Activities</h3>
                {recentRecords.length ? (
                    <ul>
                        {recentRecords.map(record => (
                            <li key={record.id}>{/* Format your record display here */}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading recent activities...</p>
                )}
            </section>
            <section>
                <h3>Upcoming Tasks</h3>
                {upcomingTasks.length ? (
                    <ul>
                        {upcomingTasks.map(task => (
                            <li key={task.id}>{/* Format your task display here */}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading upcoming tasks...</p>
                )}
            </section>
            <section>
                <h3>Quick Links</h3>
                {/* Add links or buttons for quick navigation */}
            </section>
        </div>
    );
};

export default Dashboard;
