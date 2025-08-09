import { useState, useEffect } from 'react';

const getActionsByModule = (moduleName) => {
  const stored = localStorage.getItem("groupedPrivileges");
  if (!stored) return [];
  try {
    const privileges = JSON.parse(stored);
    if (!privileges[moduleName] || !Array.isArray(privileges[moduleName])) return [];
    return privileges[moduleName].flatMap(item => item.action);
  } catch (e) {
    console.error("Parsing groupedPrivileges error", e);
    return [];
  }
};


const useModuleActions = (moduleName) => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    setActions(getActionsByModule(moduleName));
  }, [moduleName]);
  return actions;
};

export default useModuleActions;
