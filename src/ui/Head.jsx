import React from 'react'
import { useNavigate } from 'react-router-dom'

const Head = ({ name, kind, nav = -1 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof nav === 'number') {
      navigate(nav);
    } else if (typeof nav === 'object') {
      navigate(nav.pathname, { state: nav.state });
    } else if (typeof nav === 'string') {
      navigate(nav); 
    }
  };

  return (
    <div className="relative flex items-center mt-5">
      <button
        onClick={handleClick}
        className="text-seven text-2xl font-normal"
      >
        {name} / <span className="text-one">{kind}</span>
      </button>
    </div>
  );
};

export default Head;
