import React, { useState } from 'react';

function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => setActiveTab(tabIndex);

  return (
    <div className="tabs">
      <ul>
        {tabs.map((tab, index) => (
          <li key={tab.title} className={activeTab === index ? 'active' : ''}>
            <button onClick={() => handleTabClick(index)}>{tab.title}</button>
          </li>
        ))}
      </ul>
      <div className="content">
        {tabs[activeTab].component}
      </div>
    </div>
  );
}

export default Tabs;
