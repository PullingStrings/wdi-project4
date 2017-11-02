import React from 'react';
import DragDrop from '../utility/DragDrop';

import PlacesAutocomplete from 'react-places-autocomplete';


function UsersForm({ handleSubmit, handleChange, handleAutocomplete, address, user }) {
  const inputProps = {
    value: address,
    onChange: handleAutocomplete
  };

  return (
    <div className="container">
      <div className="EditSection">
        <div className="row">
          <form onSubmit={handleSubmit} className="EditForm">
            <div className="form-group">
              <label htmlFor="username"> Place Username</label>
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
            <div className="form-group">
              <label htmlFor="location"> Enter Your location</label>
              <PlacesAutocomplete inputProps={inputProps} />
            </div>
            <div>
              <button className="save-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UsersForm;
