import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";

const App = () => {
  const [Items, setItems] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (Item) => {
    setCurrentId(Item.id);
    setFormData({
      name: Item.name,
      category: Item.category,
      quantity: Item.quantity,
      price: Item.price,
      expiryDate: Item.expiryDate,
    });
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (id) => {
    setCurrentId(id);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const getItems = async () => {
    try {
      const response = await fetch("https://67288011270bd0b97555c189.mockapi.io/items");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch("https://67288011270bd0b97555c189.mockapi.io/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleCloseAddModal();
        getItems();
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Post error: ", error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      const response = await fetch(
        `https://67288011270bd0b97555c189.mockapi.io/items/${currentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        handleCloseEditModal();
        getItems();
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Update error: ", error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `https://67288011270bd0b97555c189.mockapi.io/items/${currentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        handleCloseDeleteModal();
        getItems();
      } else {
        console.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Delete error: ", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container className="my-3">
      <h1 className="text-center mb-4">Supermarket Item Restocking</h1>
      <Row className="gx-3">
        <Button id="btnCourse" variant="secondary" className="col my-3 mx-2" onClick={getItems}>
          Show a list of items
        </Button>
        <Button id="btnAdd" variant="primary" className="col my-3 mx-2" onClick={handleShowAddModal}>
          Add new item
        </Button>
      </Row>

      <div className="table-responsive">
        <Table bordered hover striped className="text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Modify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Items.map((Item, index) => (
              <tr key={Item.id}>
                <td>{index + 1}</td>
                <td>{Item.name}</td>
                <td>{Item.category}</td>
                <td>{Item.quantity}</td>
                <td>{Item.price}</td>
                <td>{Item.expiryDate}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleShowEditModal(Item)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleShowDeleteModal(Item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control name="name" type="text" className="mb-2"  value={formData.name} onChange={handleChange} />
            <Form.Control name="category" type="text" className="mb-2"  value={formData.category} onChange={handleChange}/>
            <Form.Control name="quantity" type="text" className="mb-2"  value={formData.quantity} onChange={handleChange}/>
            <Form.Control name="price" type="text" className="mb-2"  value={formData.price} onChange={handleChange}/>
            <Form.Control name="expiryDate" type="date" className="mb-2"  value={formData.expiryDate} onChange={handleChange}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleCloseAddModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control name="name" type="text" className="mb-2" placeholder="Enter name" value={formData.name} onChange={handleChange} />
            <Form.Control name="category" type="text" className="mb-2" placeholder="Enter category" value={formData.category} onChange={handleChange}/>
            <Form.Control name="quantity" type="text" className="mb-2" placeholder="Enter quantity" value={formData.quantity} onChange={handleChange}/>
            <Form.Control name="price" type="text" className="mb-2" placeholder="Enter price" value={formData.price} onChange={handleChange}/>
            <Form.Control name="expiryDate" type="date" className="mb-2" placeholder="Enter expiry date" value={formData.expiryDate} onChange={handleChange}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
