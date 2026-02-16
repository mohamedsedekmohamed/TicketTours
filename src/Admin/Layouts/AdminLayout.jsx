import React, { useEffect, useState } from 'react';
import AdminSidebar from "../component/AdminSidebar";
import AdminNavbar from "../component/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client"; // استيراد مكتبة السوكيت

const AdminLayout = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(null); // حالة الإشعار الجديد
  const navigate = useNavigate();

  useEffect(() => {
   const socket = io("https://bcknd.tickethub-tours.com", {
  auth: { token: localStorage.getItem('token') }
});

    // 2. الاستماع لحدث الإشعارات الجديد كما في الصورة (new_notification)
    socket.on("new_notification", (data) => {
      console.log("Received notification:", data);
      setNewNotification(data); // تخزين البيانات لإظهارها في الـ Popup
      
      // اختياري: تشغيل صوت تنبيه بسيط
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      audio.play().catch(e => console.log("Audio play deferred"));
    });

    // إدارة المقاسات (Resize)
    if (window.innerWidth >= 1024) setIsOpen(true);
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      socket.disconnect(); // قطع الاتصال عند مغادرة الصفحة
    };
  }, []);

  // وظيفة التعامل مع زر "Read"
  const handleRead = () => {
    setNewNotification(null);
    navigate("/admin/notifications");
  };

  return (
    <div className="flex overflow-hidden h-screen relative bg-gray-50">
      
      {/* --- Popup Notification Overlay --- */}
      {newNotification && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-t-4 border-[#091A2E] transform scale-100 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#091A2E] p-2 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#091A2E]">New Notification</h3>
            </div>
            
            <div className="mb-6">
              <p className="font-semibold text-gray-800 text-lg mb-1">{newNotification.title}</p>
              <p className="text-gray-600 leading-relaxed">{newNotification.message}</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleRead}
                className="flex-1 bg-[#091A2E] text-white py-3 rounded-xl font-semibold hover:bg-[#0d2a4a] transition-colors"
              >
                Read Now
              </button>
              <button 
                onClick={() => setNewNotification(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------------------------------- */}

      <aside className={`transition-all duration-100 ${isOpen ? 'w-56' : 'w-16'} p-1 z-10 top-0 h-screen`}>
        <AdminSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </aside>

      <div className="flex-1 flex flex-col w-full overflow-auto p-2">
        <header className="rounded-[12px] shadow p-4 m-2 bg-white">
          <AdminNavbar setIsOpen={setIsOpen} isOpen={isOpen} setIsLoggedIn={setIsLoggedIn}/>
        </header>

        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;