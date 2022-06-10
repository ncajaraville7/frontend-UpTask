import React from 'react';
import { Link } from 'react-router-dom';

const PreviewProjects = ({ client, name, _id }) => {
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1">
        {name}
        <span className="text-sm text-gray-500 uppercase">
          {''} {client}
        </span>
      </p>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 font-bold uppercase text-sm"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProjects;
