// App.js
import React, { useState } from 'react';
import OrgNode from './OrgNode';
import './index.css';

function App() {
  const [orgData, setOrgData] = useState({
    id: 1,
    name: 'CEO',
    children: [],
  });

  const addChild = (parentId, newChild) => {
    const addNodeRecursively = (node) => {
      if (node.id === parentId) {
        node.children.push(newChild);
      } else {
        node.children.forEach(addNodeRecursively);
      }
    };

    setOrgData((prevData) => {
      const newData = { ...prevData };
      addNodeRecursively(newData);
      return newData;
    });
  };

  const removeNode = (nodeId) => {
    const removeNodeRecursively = (node, id) => {
      node.children = node.children.filter((child) => child.id !== id);
      node.children.forEach((child) => removeNodeRecursively(child, id));
    };

    setOrgData((prevData) => {
      const newData = { ...prevData };
      if (newData.id === nodeId) {
        return null; // En üst düğüm silinirse, tüm şema silinir
      }
      removeNodeRecursively(newData, nodeId);
      return newData;
    });
  };

  if (!orgData) {
    return <h2>Şema boş.</h2>;
  }

  return (
    <div className="app">
      <h1>Organizasyon Şeması</h1>
      <OrgNode nodeData={orgData} addChild={addChild} removeNode={removeNode} />
    </div>
  );
}

export default App;
