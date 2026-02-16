import React, { useEffect, useState } from "react";
import Navtwo from "../../component/Navtwo";
import { LuClock, LuMapPin, LuCheckCheck, LuFileText, LuGem } from "react-icons/lu";
import { SiInfluxdb } from "react-icons/si";

import { FaUsers, FaStar, FaChevronRight } from "react-icons/fa";
import { MdOutlineCategory, MdOutlinePolicy } from "react-icons/md";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StaticMap from "./StaticMap";
import Questions from "../Home/Parts/Questions";
import Footer from "../Footer";
import QuestionsWithimage from "../QuestionsWithimage";
import BulkDiscountTable from "../BulkDiscountTable";
import Loading from "../../../ui/Loading";

const InfoTour = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bcknd.tickethub-tours.com/api/user/landpage/category-tours/category/${id}`
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="h-screen w-screen flex items-center justify-center"><Loading /></div>;

  const images = data.images || [];

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-900">
      <Navtwo />

      {/* --- Section: Hero & Header --- */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4 bg-white w-fit px-4 py-2 rounded-full shadow-sm">
          <button onClick={() => navigate(-1)} className="hover:text-one transition-colors">Tours</button>
          <FaChevronRight className="text-[10px]" />
          <span className="text-slate-400">{data.category}</span>
          <FaChevronRight className="text-[10px]" />
          <span className="text-one font-semibold">{data.city}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
          {data.title}
        </h1>

        {/* --- Modern Gallery Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3  overflow-hidden rounded-[2rem] shadow-2xl">
          <div className="md:col-span-8 relative group h-full">
            <img src={data.mainImage} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>
          <div className="hidden md:flex md:col-span-4 flex-col gap-3 h-full">
            <div className="h-1/2 w-full overflow-hidden">
                <img src={images[1] || data.mainImage} alt="Gallery 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="h-1/2 w-full relative overflow-hidden group">
                <img src={images[2] || data.mainImage} alt="Gallery 2" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setShowAll(true)}
                  className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center text-white backdrop-blur-[2px]"
                >
                  <span className="text-3xl font-bold">+{images.length}</span>
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">Show All Photos</span>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section: Quick Stats Bar --- */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8  relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-2 grid grid-cols-2 md:grid-cols-4 gap-2 border border-slate-100">
          {[
            { icon: <LuClock className="text-blue-500"/>, label: "Duration", val: `${data.durationHours} Hours` },
            { icon: <MdOutlineCategory className="text-purple-500"/>, label: "Tour Type", val: data.category },
            { icon: <FaUsers className="text-orange-500"/>, label: "Max Capacity", val: `${data.maxUsers} Persons` },
            { icon: <LuGem className="text-emerald-500"/>, label: "Trip Points", val: `${data.points} Pts` },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="text-2xl bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-xl border border-slate-50">{item.icon}</div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{item.label}</p>
                <p className="text-sm font-bold text-slate-700">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- Left Content: 8 Cols --- */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* Overview */}
          <section className="relative">
            <div className="absolute -left-4 top-0 w-1 h-8 bg-one rounded-full" />
            <h2 className="text-2xl font-black text-slate-800 mb-6">Experience Description</h2>
            <p className="text-slate-600 leading-relaxed text-lg lg:pr-10 whitespace-pre-line">
              {data.description}
            </p>
          </section>

          {/* Highlights Grid */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
               <FaStar className="text-yellow-400 text-xl" /> Tour Highlights
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.highlights?.map((h, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-md group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <LuCheckCheck size={18} />
                  </div>
                  <span className="text-slate-600 font-medium leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Included / Excluded - Modern Split */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 rounded-[2rem] p-8 border border-emerald-100/50">
              <h3 className="text-lg font-black text-emerald-800 mb-6 uppercase tracking-widest flex items-center gap-2">
                <LuCheckCheck /> What's Included
              </h3>
              <ul className="space-y-4">
                {data.includes?.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 font-medium italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/50 rounded-[2rem] p-8 border border-red-100/50">
              <h3 className="text-lg font-black text-red-800 mb-6 uppercase tracking-widest flex items-center gap-2">
                <SiInfluxdb /> Not Included
              </h3>
              <ul className="space-y-4">
                {data.excludes?.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 font-medium italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-800">Trip Itinerary</h2>
                <p className="text-slate-500">Step-by-step journey of your adventure</p>
            </div>
            <QuestionsWithimage data={data?.itinerary} />

          </section>
        </div>

        {/* --- Right Content: 4 Cols (Sticky Info) --- */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            
            {/* Price Glass Card */}
            <div className="bg-one rounded-[2.5rem] p-8 text-white shadow-2xl shadow-one/30 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
              <p className="text-xs uppercase font-black tracking-[0.3em] mb-4 opacity-80">Best Value Price</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-6xl font-black">{data.price.adult}</span>
                <span className="text-xl font-bold opacity-90">{data.price.currency}</span>
                <span className="text-sm opacity-70">/ Person</span>
              </div>
              <div className="h-[1px] bg-white/20 w-full mb-6" />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70 font-medium">Children (Under 12)</span>
                  <span className="font-bold">{data.price.child} {data.price.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70 font-medium">Infants (Under 3)</span>
                  <span className="font-bold">{data.price.infant} {data.price.currency}</span>
                </div>
              </div>
            </div>

            {/* Policy Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
               <h4 className="flex items-center gap-2 font-black text-slate-800 mb-4 uppercase text-xs tracking-widest">
                 <MdOutlinePolicy className="text-one text-lg" /> Booking Policy
               </h4>
               <div className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-500 leading-relaxed italic border-l-4 border-one">
                 "{data.policy || "Standard cancellation policies apply to this tour. Please contact support for more details."}"
               </div>
            </div>

            {/* Document Button */}
            {data.files && (
              <a 
                href={data.files} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between w-full bg-slate-900 text-white p-5 rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LuFileText className="text-one text-xl" />
                  <span>Full Trip Brochure</span>
                </div>
                <div className="bg-white/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                    <FaChevronRight size={12} />
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* --- Section: Location --- */}
      {data?.meetingPointLocation && (
        <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-white rounded-[3rem] p-4 shadow-xl border border-slate-100">
             <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-md">
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Meeting Location</h2>
                    <div className="flex items-start gap-3 text-slate-500 mb-2">
                        <LuMapPin className="text-one mt-1 flex-shrink-0" />
                        <p className="font-medium text-lg text-slate-600">{data.meetingPointAddress}</p>
                    </div>
                    <p className="text-sm text-slate-400">Please arrive 15 minutes before the scheduled start time.</p>
                </div>
                <div className="flex-1 h-[350px] rounded-[2rem] overflow-hidden shadow-inner bg-slate-100 border-4 border-white">
                  <StaticMap
                    lat={parseFloat(data.meetingPointLocation.split("q=")[1]?.split(",")[0])}
                    lng={parseFloat(data.meetingPointLocation.split("q=")[1]?.split(",")[1])}
                  />
                </div>
             </div>
          </div>
        </section>
      )}

      {/* --- Section: Pricing Tables --- */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Bulk Savings</h2>
            <p className="text-slate-500 font-medium">Invite more people and pay less per person</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {['adult', 'child', 'infant'].map(group => (
            <div key={group} className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100">
                <BulkDiscountTable 
                  title={`${group.charAt(0).toUpperCase() + group.slice(1)} Group`}
                  data={data?.discounts?.filter(d => d.targetGroup === group)} 
                />
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: FAQ --- */}
      {data?.faq && (
        <div className="bg-slate-50 py-24">
            <div className=" mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-one font-black uppercase tracking-[0.4em] text-[10px]">Support</span>
                    <h2 className="text-4xl font-black text-slate-800 mt-2">Common Questions</h2>
                </div>
                <Questions data={data?.faq} stopstatus />
            </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showAll && (
        <div className="fixed inset-0 bg-slate-900/95 z-[100] backdrop-blur-xl flex flex-col p-6 overflow-y-auto animate-in fade-in duration-300">
          <button onClick={() => setShowAll(false)} className="self-end text-white p-4 hover:rotate-90 transition-transform">
            <SiInfluxdb size={40} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto mt-10 pb-20">
            {images.map((img, i) => (
              <div key={i} className="aspect-video overflow-hidden rounded-[2rem] border-8 border-white/5 shadow-2xl">
                <img src={img} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default InfoTour;