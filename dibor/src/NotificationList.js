import Notification from "./Notification";
function NotificationList({notification}) {
    
  const userList = notification.map((notification, key) => {
    return <Notification  key={key} from={notification.from} message={notification.message} time={notification.time} />
    });
   
  return (
    <div id="toast-container">
       {userList}
    </div>
  );
}

export default NotificationList;
