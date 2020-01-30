import React, { useRef, useState, useEffect } from 'react';
import './Options.css';

const Options = (props) => {
  const [project, setProject] = useState('');
  const submitProject = (e) => {
    e.preventDefault();
    chrome.storage.sync.set({ project });
  };

  useEffect(() => {
    chrome.storage.sync.get(['project'], (result) => {
      setProject(result.project || '');
    });
  }, []);

  return (
    <div className="OptionsContainer">
      <h1>Project Name of Scrapbox</h1>
      <form onSubmit={submitProject}>
        <input value={project} onChange={(e) => setProject(e.target.value)} />
        <button>Save</button>
      </form>
    </div>
  );
};

export default Options;
