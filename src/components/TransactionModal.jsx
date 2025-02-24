import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TransactionModal = ({ show, handleClose, handleSubmit }) => {
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    type: "",
    date: "",
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    handleSubmit(transaction);
    setTransaction({
      title: "",
      amount: "",
      category: "",
      description: "",
      type: "",
      date: "",
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Transaction Name"
              value={transaction.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={transaction.amount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" value={transaction.category} onChange={handleChange}>
              <option value="">Choose...</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              placeholder="Enter Description"
              value={transaction.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Control as="select" name="type" value={transaction.type} onChange={handleChange}>
              <option value="">Choose...</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={transaction.date} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;
