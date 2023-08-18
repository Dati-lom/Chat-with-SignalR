
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TagInput({ handleTagChange }) {
    
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
  
    const handleTagAdd = () => {
      if (tag.trim() !== '') {
        setTags([...tags, tag]);
        handleTagChange([...tags, tag]);
        setTag('');
      }
    };
  
    return (
      <div className="vh-100 d-flex flex-column p-3 border border-primary-subtle">
  <div className="flex-grow-1 overflow-auto">
    {tags.map((tag, index) => (
      <span key={index} className="badge bg-primary me-2">
        {tag}
        <button
          className="btn-close btn-close-sm"
          onClick={() => {
            const updatedTags = tags.filter((t, i) => i !== index);
            setTags(updatedTags);
            handleTagChange(updatedTags);
          }}
        ></button>
      </span>
    ))}
  </div>
  <div className="mt-auto">
    <input
      type="text"
      className="form-control mb-2 border border-primary-subtle"
      placeholder="Enter a tag"
      value={tag}
      onChange={(e) => setTag(e.target.value)}
    />
    <button className="btn btn-primary" onClick={handleTagAdd}>
      Add Tag
    </button>
  </div>
</div>
    );
}

export default TagInput;
