import { useState } from "react";

import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";

import useGetAllUsers from "../../hooks/useGetAllUsers";
import useSearchFilter from "../../hooks/useSearchFilter";
import ChatList from "./ChatList";
import SearchInput from "./SearchInput";

export default function AddChatButton() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, users } = useGetAllUsers();
  const filteredUsers = useSearchFilter(users, searchTerm, "displayName");

  const handleClose = () => {
    setShowModal(false);
    setSearchTerm("");
  };
  const handleShow = () => setShowModal(true);

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="add-chat">add chat</Tooltip>}
      >
        <button className="btn m-1 rounded-circle" onClick={handleShow}>
          <FaCirclePlus size={20} />
        </button>
      </OverlayTrigger>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 d-flex justify-content-center">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChatList loading={loading} chats={filteredUsers} />
        </Modal.Body>
      </Modal>
    </>
  );
}
