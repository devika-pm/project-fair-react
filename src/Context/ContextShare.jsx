import React, { createContext, useState } from 'react';

export const AddProjectResponseContext = createContext();
export const editProjectResponseContext = createContext()

function ContextShare({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState({});
  const [editProjectResponse,setEditProjectResponse] = useState({})

  return (
    <AddProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>{children}</editProjectResponseContext.Provider>
    </AddProjectResponseContext.Provider>
  );
}

export default ContextShare;