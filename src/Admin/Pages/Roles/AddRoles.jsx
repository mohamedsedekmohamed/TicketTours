import React, { useEffect, useState } from "react";
import Head from "../../../ui/Head";
import Loading from "../../../ui/Loading";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonDone from "../../../ui/ButtonDone";

const AddRoles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendData } = location.state || {};
  const [edit, setEdit] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!sendData) return;

      try {
        setEdit(true);
        const token = localStorage.getItem("token");

        const privsResponse = await axios.get(
          `https://bcknd.tickethub-tours.com/api/admin/privileges`
        , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        setData(privsResponse.data?.data?.privilegs || {});

        const adminResponse = await axios.get(
          `https://bcknd.tickethub-tours.com/api/admin/admins/${sendData}`
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        const privileges = adminResponse?.data?.data?.privilegs;

        if (privileges) {
          const selectedIds = Object.values(privileges)
            .flat()
            .map((item) => item.id);
          setIds(selectedIds);
        } else {
          setIds([]);
        }
      } catch (error) {
        toast.error("Error fetching privileges");
      }

      setLoading(false);
    };

    fetchData();
  }, [sendData]);

  const handleToggle = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setCheckLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://bcknd.tickethub-tours.com/api/admin/admins/${sendData}/privileges`,
        { privilegesIds: ids },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast.success(`Admin ${edit ? "updated" : "added"} successfully`);
        setTimeout(() => {
          navigate("/admin/roles");
        }, 1000);
        setEdit(false);
      })
      .catch((error) => {
        const err = error?.response?.data?.error;

        if (err?.details && Array.isArray(err.details)) {
          err.details.forEach((detail) => {
            toast.error(`${detail.field}: ${detail.message}`);
          });
        } else if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong.");
        }
        setCheckLoading(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <Head kind={edit ? "Edit" : "Add"} name=" Roles" />
      <ToastContainer />
      <div className="flex items-center mt-4 space-x-3">
        <input
          type="checkbox"
          className="w-5 h-5 accent-one"
          checked={Object.values(data)
            .flat()
            .every((item) => ids.includes(item.id))}
          onChange={(e) => {
            if (e.target.checked) {
              const allIds = Object.values(data)
                .flat()
                .map((item) => item.id);
              setIds(allIds);
            } else {
              setIds([]);
            }
          }}
        />
        <label className="text-lg font-medium text-one">Select ALl </label>
      </div>

      {data && (
        <div className="space-y-6 mt-4">
          {Object.entries(data).map(([section, actions]) => (
            <div key={section} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-one"
                    checked={actions.every((item) => ids.includes(item.id))}
                    onChange={(e) => {
                      const sectionIds = actions.map((item) => item.id);
                      if (e.target.checked) {
                        const newIds = [...new Set([...ids, ...sectionIds])];
                        setIds(newIds);
                      } else {
                        setIds((prev) =>
                          prev.filter((id) => !sectionIds.includes(id))
                        );
                      }
                    }}
                  />
                  <h2 className="text-xl font-semibold text-one">{section}</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {actions.map(({ id, action }) => (
                  <label key={id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="accent-one w-4 h-4"
                      checked={ids.includes(id)}
                      onChange={() => handleToggle(id)}
                    />
                    <span className="text-one">{action}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <ButtonDone
          checkLoading={checkLoading}
          handleSave={handleSave}
          edit={edit}
        />
      </div>
    </div>
  );
};

export default AddRoles;
