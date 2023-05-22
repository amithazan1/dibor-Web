

function UserInfo({  currentUser }) {


  return (
          <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header" id="profile-tab">
    <h5 className="offcanvas-title" >
      Profile
    </h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div className="d-flex align-items-center mb-3">
      <img src={currentUser.picture} className="rounded-circle me-3" id="profile-img-showcase" alt="Profile Picture" width={200}/>
      <div>
        <div className="fw-bold">{currentUser.username}</div>
        <div className="text-muted">{currentUser.display}</div>
      </div>
    </div>
    <hr className="dropdown-divider" />
    <div className="text-muted small">Account info:</div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item border-0 p-0">
        <div className="text-muted">Phone</div>
        <div>{currentUser.phone}</div>
      </li>
      <li className="list-group-item border-0 p-0">
        <div className="text-muted">Email</div>
        <div>{currentUser.email}</div>
      </li>
      <li className="list-group-item border-0 p-0">
        <div className="text-muted">Status</div>
        <div>{currentUser.status}</div>
      </li>
    </ul>
  </div>
</div>

  );
}

export default UserInfo;
