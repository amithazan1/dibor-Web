function Notification({ from, message, time }) {
  return (
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <img src="/logo.png" className="img-fluid rounded-circle logoNotification" alt="Your Image" />
        <strong className="me-auto">{from}:</strong>
        <div className="notification textNotification">{message.length > 15 ? message.substring(0, 15) + ".." : message}</div>
        <div className="notification time">{time}</div>
      </div>
    </div>
  );
}

export default Notification;
