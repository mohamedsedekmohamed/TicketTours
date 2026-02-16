import React, { useEffect, useState } from 'react';
import AdminSidebar from "../component/AdminSidebar";
import AdminNavbar from "../component/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios"; // تأكد من استيراد axios

const AdminLayout = ({ setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const [unseenCount, setUnseenCount] = useState(0); // حالة لتخزين عدد الإشعارات غير المقروءة
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 1. دالة لجلب عدد الإشعارات غير المقروءة من الـ API
  const fetchUnseenCount = async () => {
    try {
      const response = await axios.get("https://bcknd.tickethub-tours.com/api/admin/notifications/unseen/count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUnseenCount(response.data.data.unSeenNotificationsCount);
      }
    } catch (error) {
      console.error("Error fetching unseen count:", error);
    }
  };

  useEffect(() => {
    // جلب العدد عند تحميل الصفحة لأول مرة
    fetchUnseenCount();

    const socket = io("https://bcknd.tickethub-tours.com", {
      auth: { token: token }
    });

    socket.on("new_notification", (data) => {
      console.log("Received notification:", data);
      setNewNotification(data);
      
      // 2. تحديث العدد فوراً عند وصول إشعار عبر السوكيت
      fetchUnseenCount(); 

      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      audio.play().catch(e => console.log("Audio play deferred"));
    });

    if (window.innerWidth >= 1024) setIsOpen(true);
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      socket.disconnect();
    };
  }, []);

  const handleRead = () => {
    setNewNotification(null);
    // عند الذهاب لصفحة الإشعارات، غالباً ستقرأها، فيفضل تصفير العداد أو إعادة جلبه
    navigate("/admin/notifications");
  };

  return (
    <div className="flex overflow-hidden h-screen relative bg-gray-50">
      
      {/* --- Popup Notification Overlay --- */}
      {newNotification && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-t-4 border-[#091A2E]">
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-[#091A2E] p-2 rounded-lg text-white relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                {/* عرض الدائرة الحمراء بالعدد الجديد داخل الـ Popup */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {unseenCount}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#091A2E]">New Notification</h3>
            </div>
            
            <div className="mb-6">
              <p className="font-semibold text-gray-800 text-lg mb-1">{newNotification.title}</p>
              <p className="text-gray-600 leading-relaxed">{newNotification.message}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={handleRead} className="flex-1 bg-[#091A2E] text-white py-3 rounded-xl font-semibold">
                Read Now ({unseenCount})
              </button>
              <button onClick={() => setNewNotification(null)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className={`transition-all duration-100 ${isOpen ? 'w-56' : 'w-16'} p-1 z-10 top-0 h-screen`}>
        {/* يمكنك تمرير الـ unseenCount للـ Sidebar لإظهار رقم بجانب كلمة إشعارات */}
        <AdminSidebar setIsOpen={setIsOpen} isOpen={isOpen} unseenCount={unseenCount} />
      </aside>

      <div className="flex-1 flex flex-col w-full overflow-auto p-2">
        <header className="rounded-[12px] shadow p-4 m-2 bg-white">
          {/* تمرير العدد للـ Navbar ليظهر فوق أيقونة الجرس */}
          <AdminNavbar setIsOpen={setIsOpen} isOpen={isOpen} setIsLoggedIn={setIsLoggedIn} unseenCount={unseenCount} />
        </header>

        <main className="flex-1 w-full">
<Outlet context={{ fetchUnseenCount }} />        </main>
      </div>
    </div>
  );
};

export default AdminLayout;