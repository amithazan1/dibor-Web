import './SearchBtn.css';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';



//top buttons above the contacts.
function TopButtons({userNameInfo,showUsers, token,setQuery }) {
  

  function logOut() {
    //need to set logout
  }

  const [showInput, setShowInput] = useState(false);

  const searchBox = useRef(null);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

    const toggleFocus = () => {
         searchBox.current.focus();

  };
  

  const search = function () {
    setQuery(searchBox.current.value);
  };
  

  //add contact

    const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

    
  
  const addUser = async function (username) {
            const data = {
    username: username
  }
 
    const res = await fetch('http://localhost:12345/api/Chats', {
     method: 'post',
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      },
          'body': JSON.stringify(data)

    });
       if (res.ok) {
         showUsers();
  } else {
    console.log("Error:", res.status); // Log the error status if the response is not successful
  }


  // You can add code here to handle the response
};



  const handleSubmit = (event) => {
    event.preventDefault();
    addUser(name);
    setName('');
  }
  


  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      
       <button
                type="button"
                className="btn"
                id="settings-btn"
                data-bs-toggle="dropdown" aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={25}
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
        </button>


     <ul className="dropdown-menu">
    <li>    
          <a onClick={logOut} type="button" className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
  <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z"></path>
  <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z"></path>
</svg>
                Log Out
            </a></li>
      </ul>

            <div className="container-fluid msg-bar">
              <button
                type="button"
                className="btn"
                id="contact-add-btn"
                data-bs-toggle="modal"
                data-bs-target="#addContact"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-person-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  <path
                    fillRule="evenodd"
                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
                <span className="visually-hidden">Button</span>
              </button>
                 <div className="modal fade" id="addContact" tabIndex="-1" aria-labelledby="addContactLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title" id="addContactLabel">Add Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="contactName" className="form-label">Name</label>
                <input type="text" className="form-control" id="contactName" value={name} onChange={handleNameChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" id = "close-btn" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn" id ="add-btn">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
          
      

         <button type="button" className="btn" id="search-btn" onMouseDown={toggleInput} onMouseUp={toggleFocus} >
       <svg  width={20}
                  height={25} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
</svg>
      </button>
      <input ref={searchBox} onKeyUp={search}
        className={`form-control search-input ${showInput ? 'show-input' : ''}`}
        type="text"
        placeholder="search contact"
          aria-label="default input example"
           width={25}
                  height={25}
        />
        
             
            <a
                type="button"
                className="btn"
                id="settings-btn"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                              <img src={userNameInfo?.profilePic}   className="img-fluid rounded-circle"  width={60}  height={60} ></img>

             </a>
        

      </div>
                  
                  
  
      
                      </nav>

  );
}

export default TopButtons;
