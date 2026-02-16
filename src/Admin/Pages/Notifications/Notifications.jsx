import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('token'); 
  const API_BASE = 'https://bcknd.tickethub-tours.com/api/admin/notifications';

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE, config);
      if (response.data.success) {
        const data = activeTab === 'all' 
          ? response.data.data.AllNotifications 
          : response.data.data.unReadNotifications;
        setNotifications(data);
      }
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    setCurrentPage(1); 
  }, [activeTab]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE}/${id}/read`, {}, config);
      toast.success("Marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // وظيفة المسح بعد التأكيد
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, config);
      toast.success("Notification deleted successfully");
      fetchNotifications();
    } catch (error) {
      toast.error("Error deleting notification");
    }
  };

  // Toast مخصص للتأكيد قبل المسح
  const confirmDelete = (id) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ margin: "0 0 10px 0" }}>Are you sure you want to delete?</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => { handleDelete(id); closeToast(); }} 
              style={{ ...btnConfirm, background: "#ff4d4f" }}
            >
              Yes, Delete
            </button>
            <button 
              onClick={closeToast} 
              style={{ ...btnConfirm, background: "#666" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  return (
    <div style={containerStyle}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div style={headerStyle}>
        <h2 style={{ color: '#091A2E', margin: 0, fontSize: '28px' }}>Notifications</h2>
        <p style={{ color: '#666' }}>Manage system updates and requests</p>
      </div>

      <div style={tabsContainer}>
        <button onClick={() => setActiveTab('all')} style={tabButtonStyle(activeTab === 'all')}>
          All ({activeTab === 'all' ? notifications.length : '..'})
        </button>
        <button onClick={() => setActiveTab('unread')} style={tabButtonStyle(activeTab === 'unread')}>
          Unread ({activeTab === 'unread' ? notifications.length : '..'})
        </button>
      </div>

      {loading ? (
        <div style={{ color: '#091A2E', textAlign: 'center', padding: '50px' }}>Loading...</div>
      ) : (
        <div style={listContainer}>
          {currentItems.length === 0 ? (
            <div style={{ color: '#666', textAlign: 'center', padding: '50px' }}>No items found.</div>
          ) : (
            currentItems.map((note) => (
              <div key={note.id} style={cardStyle(note.isRead)}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={titleStyle}>{note.title}</h4>
                    {!note.isRead && <span style={unreadBadge}>New</span>}
                  </div>
                  <p style={msgStyle}>{note.message}</p>
                  <small style={dateStyle}>{new Date(note.createdAt).toLocaleString()}</small>
                </div>
                
                <div style={actionsStyle}>
                  {!note.isRead && (
                    <button onClick={() => markAsRead(note.id)} style={btnRead}>Mark as Read</button>
                  )}
                  <button onClick={() => confirmDelete(note.id)} style={btnDelete}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div style={paginationContainer}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} style={navBtnStyle}>Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} style={pageBtnStyle(currentPage === i + 1)}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} style={navBtnStyle}>Next</button>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const containerStyle = { width: '100%', minHeight: '100vh', padding: '40px', backgroundColor: '#FFFFFF', boxSizing: 'border-box' };
const headerStyle = { marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' };
const tabsContainer = { display: 'flex', gap: '10px', marginBottom: '30px' };
const tabButtonStyle = (isActive) => ({
  padding: '12px 24px', cursor: 'pointer', border: isActive ? 'none' : '1px solid #091A2E', borderRadius: '6px',
  backgroundColor: isActive ? '#091A2E' : 'transparent', color: isActive ? 'white' : '#091A2E', fontWeight: '600'
});
const listContainer = { display: 'flex', flexDirection: 'column', gap: '15px' };
const cardStyle = (isRead) => ({
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '10px',
  backgroundColor: '#fff', border: isRead ? '1px solid #eee' : '2px solid #091A2E', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
});
const titleStyle = { margin: 0, fontSize: '17px', fontWeight: '700', color: '#091A2E' };
const msgStyle = { margin: '8px 0', fontSize: '15px', color: '#333' };
const dateStyle = { color: '#888', fontSize: '12px' };
const unreadBadge = { backgroundColor: '#091A2E', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '4px' };
const actionsStyle = { display: 'flex', gap: '10px' };
const btnRead = { backgroundColor: '#091A2E', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' };
const btnDelete = { backgroundColor: 'transparent', color: '#ff4d4f', border: '1px solid #ff4d4f', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' };
const paginationContainer = { marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' };
const pageBtnStyle = (isActive) => ({
  width: '40px', height: '40px', cursor: 'pointer', border: '1px solid #091A2E',
  backgroundColor: isActive ? '#091A2E' : 'white', color: isActive ? 'white' : '#091A2E', borderRadius: '6px'
});
const navBtnStyle = { padding: '8px 16px', border: '1px solid #091A2E', backgroundColor: 'white', borderRadius: '6px', cursor: 'pointer' };
const btnConfirm = { color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" };

export default Notifications;