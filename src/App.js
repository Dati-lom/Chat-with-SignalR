
import { useState } from 'react';
import './App.css';
import Chat from "./Components/Chat"
import TagInput from './Components/TagInput';

function App() {
  const[tags,setTags] = useState([]);
  const handleInput=()=>{}
  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-4 vh-100">
          <TagInput handleTagChange={setTags} /> {/* Pass the setTags function */}
        </div>
        <div className="col-md-8">
          <Chat tags={tags} /> {/* Pass the tags array */}
        </div>
      </div>
    </div>
  );
}

export default App;
