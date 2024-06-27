import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Email = {
  id: number;
  name: string;
  amount: number;
  comments: string;
};

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = () => {
    axios.get("/api/emails").then((res) => {
      setEmails(res.data);
    });
  };

  const handleDeleteEmail = (id: number) => {
    axios.delete(`/api/emails/${id}`).then(() => {
      toast.success("Email deleted successfully");
      fetchEmails();
    });
  };
  const handleUpdateEmail = () => {
    if (selectedEmail) {
      axios.put(`/api/emails/${selectedEmail.id}`, selectedEmail).then(() => {
        toast.success("Email updated successfully");
        fetchEmails();
        setModalIsOpen(false);
      });
    }
  };

  const openModal = (email: Email) => {
    setSelectedEmail(email);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEmail(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedEmail((prevEmail) => {
      if (prevEmail) {
        return {
          ...prevEmail,
          [name]: name === "amount" ? parseFloat(value) : value,
        };
      }
      return prevEmail;
    });
  };

  return (
    <div>
      <h1>Email Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.name}</td>
              <td>{email.amount}</td>
              <td>{email.comments}</td>
              <td>
                <button onClick={() => openModal(email)}>Edit</button>
                <button onClick={() => handleDeleteEmail(email.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Email"
      >
        {selectedEmail && (
          <div>
            <h2>Edit Email</h2>
            <input
              type="text"
              name="name"
              value={selectedEmail.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="amount"
              value={selectedEmail.amount}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="comments"
              value={selectedEmail.comments}
              onChange={handleInputChange}
            />
            <button onClick={handleUpdateEmail}>Update Email</button>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default App;
