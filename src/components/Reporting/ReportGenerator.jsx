import React, { useState } from 'react';
import FirestoreService from '../../database/firestoreService';
import * as XLSX from 'xlsx';

const ReportGenerator = () => {
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [reportData, setReportData] = useState([]);

    const handleDateChange = (e) => {
        setDateRange({ ...dateRange, [e.target.name]: e.target.value });
    };

    const generateReport = async () => {
        const allTasks = await FirestoreService.getAll('taskRecords');
        const filteredTasks = allTasks.filter(task => 
            new Date(task.taskDate) >= new Date(dateRange.startDate) &&
            new Date(task.taskDate) <= new Date(dateRange.endDate)
        );
        setReportData(filteredTasks);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(reportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        XLSX.writeFile(workbook, 'task_report.xlsx');
    };

    return (
        <div>
            <h2>Generate Report</h2>
            <label>
                Start Date:
                <input type="date" name="startDate" value={dateRange.startDate} onChange={handleDateChange} />
            </label>
            <label>
                End Date:
                <input type="date" name="endDate" value={dateRange.endDate} onChange={handleDateChange} />
            </label>
            <button onClick={generateReport}>Generate</button>
            {reportData.length > 0 && (
                <button onClick={exportToExcel}>Export to Excel</button>
            )}
        </div>
    );
};

export default ReportGenerator;
