import React from 'react';
import ErrorPage from '../pages/ErrorPage.jsx';
import useModuleActions from '../Hooks/useModuleActions.jsx';

const ProtectedRoute = ({ moduleName, requiredAction, children }) => {
  const actions = useModuleActions(moduleName);

  const required = Array.isArray(requiredAction) ? requiredAction : [requiredAction];

const hasAccess = required.some(action => actions.includes(action));

  return hasAccess ? children : <ErrorPage /> ;
};

export default ProtectedRoute;
