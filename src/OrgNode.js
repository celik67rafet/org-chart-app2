// OrgNode.js
import React, { useState } from 'react';
import './index.css';

function OrgNode({ nodeData, addChild, removeNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(nodeData.name);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    nodeData.name = name;
  };

  const handleAddChild = () => {
    const childName = prompt('Yeni elemanın ismini girin:');
    if (childName) {
      addChild(nodeData.id, { id: Date.now(), name: childName, children: [] });
    }
  };

  const handleRemove = () => {
    removeNode(nodeData.id);
  };

  return (
    <div className="org-node">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
        />
      ) : (
        <h3 onClick={handleNameClick}>{name}</h3>
      )}
      <div className="actions">
        <button onClick={handleAddChild}>Alt Eleman Ekle</button>
        <button onClick={handleRemove}>Sil</button>
      </div>
      <div className="children">
        {nodeData.children.map((child) => (
          <OrgNode
            key={child.id}
            nodeData={child}
            addChild={addChild}
            removeNode={removeNode}
          />
        ))}
      </div>
    </div>
  );
}

export default OrgNode;
