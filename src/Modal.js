import "./Modal.css";

const Modal = ({ children, show, close }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="modal-close" onClick={close}>
          X
        </p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
