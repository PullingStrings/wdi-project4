import React from 'react';
import DragDrop from '../utility/DragDrop';


function UsersForm({ handleSubmit, handleChange, user }) {
  return (
    <div className="row">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <DragDrop
            onChange={handleChange}
            value={user.base64 || user.imageSRC}
          />
        </div>
        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default UsersForm;
