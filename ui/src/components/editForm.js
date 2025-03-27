import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/editForm.css"

const EditForm = ({ userData, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      console.log('editedData', editedData)
      // Make a request to update the user data
      await axios.put(`http://localhost:4500/users/updateUser`, editedData);
      // Call the onSave callback with the edited data
      onSave(editedData);
      alert('User info edited successfully!');
      // Update user info in local storage
      const updatedUserInfo = { ...userData, ...editedData };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset error state when the component mounts or userData changes
    setError(null);
  }, [userData]);

  return (
    <div className="modal-container">
      <div className="modal-content">

        <div className="edit-form-container">

          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={editedData.name} onChange={handleInputChange} />

          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" value={editedData.phone} onChange={handleInputChange} />

          <label htmlFor="city">City</label>
          <input type="text" name="city" value={editedData.city} onChange={handleInputChange} />

          <label htmlFor="address">Address</label>
          <input type="text" name="address" value={editedData.address} onChange={handleInputChange} />

          <button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
