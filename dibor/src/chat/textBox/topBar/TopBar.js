import { useRef } from 'react';
function TopBar({ activeUser,setmessageQuery,setCurrentMessageIndex ,currentMessageIndex, totalFoundMessages,messageQuery}) {
  
  const searchRef = useRef(null)

  const isActive = activeUser.name ===  ""

  function search() {
    setmessageQuery(searchRef.current.value)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid msg-bar">
        {activeUser && activeUser.image && (
          <img
            src={activeUser.image}
            className="img-fluid rounded-circle profileImage"
            alt="Your Image"
          />
        )}
        <strong className="contactName">{activeUser?.name}</strong>

        {totalFoundMessages === 0 && messageQuery !== '' && (
          <>
            
             <div>{0}/{0}</div>
   
          
          
    <button disabled={currentMessageIndex === 0} onClick={() => setCurrentMessageIndex(currentMessageIndex - 1)} type="button" className="btn ">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
  </svg>
  <span className="visually-hidden">Button</span>
</button>
        
     
        
        
       <button disabled={currentMessageIndex === totalFoundMessages - 1 || totalFoundMessages === 0} onClick={() => setCurrentMessageIndex(currentMessageIndex + 1)} type="button" className="btn">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
  </svg>
  <span className="visually-hidden">Button</span>
              </button>
          </>
          
        )}
        {totalFoundMessages !== 0 &&(
          <>
  <div>{currentMessageIndex + 1}/{totalFoundMessages}</div>
   
          
          
    <button disabled={currentMessageIndex === 0} onClick={() => setCurrentMessageIndex(currentMessageIndex - 1)} type="button" className="btn ">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"></path>
  </svg>
  <span className="visually-hidden">Button</span>
</button>
        
     
        
        
       <button disabled={currentMessageIndex === totalFoundMessages - 1 || totalFoundMessages === 0} onClick={() => setCurrentMessageIndex(currentMessageIndex + 1)} type="button" className="btn">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
  </svg>
  <span className="visually-hidden">Button</span>
              </button>
              </>
        )}

        <div className="input-group searchChat">
          <input
            type="text"
            className="form-control"
            placeholder="search in chat"
            aria-label="Type your message here"
            aria-describedby="button-addon2"
            ref={searchRef}
            onChange={search}
            disabled ={isActive}


          />
          
          
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
