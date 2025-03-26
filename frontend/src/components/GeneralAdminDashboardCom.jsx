// src/com/GeneralAdminDashboardCom.js
import React from 'react';
import AnalyticsChartCom from './AnalyticsChartCom';
import RequestListCom from './RequestListCom';

const GeneralAdminDashboardCom = () => {
    const allLabAnalytics = [
        { labName: 'Lab A', totalRequests: 20, approvedRequests: 15, pendingRequests: 5 },
        { labName: 'Lab B', totalRequests: 10, approvedRequests: 8, pendingRequests: 2 },
    ];

    const requests = [
        { description: 'Request for Lab A equipment', status: 'Approved' },
        { description: 'Request for Lab B space', status: 'Pending' },
    ];

    return (
        <div>
            <h2>General Admin Dashboard</h2>
            <h3>All Lab Analytics</h3>
            {allLabAnalytics.map((lab, index) => (
                <div key={index}>
                    <h4>{lab.labName}</h4>
                    <p>Total Requests: {lab.totalRequests}</p>
                    <p>Approved Requests: {lab.approvedRequests}</p>
                    <p>Pending Requests: {lab.pendingRequests}</p>
                </div>
            ))}
            <AnalyticsChartCom data={allLabAnalytics} />
            <RequestListCom requests={requests} onUpdateRequest={() => {}} />
        </div>
    );
};

export default GeneralAdminDashboardCom;
