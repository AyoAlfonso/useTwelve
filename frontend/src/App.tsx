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

type SortOrder = "asc" | "desc";

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const apiUrl = process.env.REACT_APP_API_URL_ || "http://localhost:3001";

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = () => {
    axios.get(`${apiUrl}/api/emails`).then((res) => {
      setEmails(res.data);
    });
  };

  const handleDeleteEmail = (id: number) => {
    axios.delete(`${apiUrl}/api/emails/${id}`).then(() => {
      toast.success("Email msg deleted successfully");
      fetchEmails();
    });
  };

  const handleUpdateEmail = () => {
    if (selectedEmail) {
      axios
        .put(`${apiUrl}/api/emails/${selectedEmail.id}`, selectedEmail)
        .then(() => {
          toast.success("Email msg updated successfully");
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

  const handleSortByAmount = () => {
    const newOrder: SortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sortedEmails = [...emails].sort((a, b) => {
      if (a.amount < b.amount) return newOrder === "asc" ? -1 : 1;
      if (a.amount > b.amount) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setEmails(sortedEmails);
  };

  return (
    <div>
      <h1>Email Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th onClick={handleSortByAmount} style={{ cursor: "pointer" }}>
              Amount {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.length > 0 ? (
            emails.map((email) => (
              <tr key={email.id}>
                <td>{email.name}</td>
                <td>{email.amount}</td>
                <td>{email.comments}</td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => openModal(email)}>Edit</button>
                    <button onClick={() => handleDeleteEmail(email.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Emails Found</td>
            </tr>
          )}
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
      <div>
        <h2>
          To test the app send an email to send to alfonsoayo7@gmail.com
          <br /> Put the content below in the body of the message
        </h2>
      </div>
      <div>
        name: John Doe <br />
        Amount: 363.45 <br />
        Comment: This is a test comment <br />
      </div>
    </div>
  );
};

export default App;
