import React, { useState } from 'react';
import './Dashboard.css';
import profilesData from './profile.json';
import MapComponent from './MapComponent';


var profileArray=profilesData;

const Dashboard = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [profileList, setProfileList] = useState(profileArray);
  const [editedProfile, setEditedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletedProfiles, setDeletedProfiles] = useState([]);
  const [isAddProfileDialogOpen, setIsAddProfileDialogOpen] = useState(false);

   // State variables for new profile creation
   const [newProfile, setNewProfile] = useState({
    profile_name: '',
    Description: '',
    location: '',
  });

  // Function to handle changes in new profile input fields
  const handleNewProfileInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };


  // Function to create a new profile
  const handleCreateProfile = () => {
    setProfileList([...profileList, newProfile]);
    setIsAddProfileDialogOpen(false); // Close the dialog after creating profile
  };

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
  };

  const handleShowMap = () => {
    setShowMap(false);
  };

  const handleCloseDialog = () => {
    setSelectedProfile(null);
    setShowMap(false);
  };

  const handleDeleteProfile = (profileToDelete) => {
    const updatedProfileList = profileList.filter(profile => profile !== profileToDelete);
    setProfileList(updatedProfileList);
    setDeletedProfiles([...deletedProfiles, profileToDelete]); // Add deleted profile to the deletedProfiles array
  };

  // const handleAddProfile = () => {
  //   if (deletedProfiles.length > 0) {
  //     const restoredProfile = deletedProfiles.pop(); // Retrieve the last deleted profile
  //     setProfileList([restoredProfile, ...profileList]); // Add the restored profile to the top of the profileList
  //     setDeletedProfiles([...deletedProfiles]); // Update the deletedProfiles array
  //   }
  // };

  const handleEditProfile = (profile) => {
    setEditedProfile(profile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedProfileList = profileList.map(profile => {
      if (profile === selectedProfile) {
        return editedProfile;
      }
      return profile;
    });
    setProfileList(updatedProfileList);
    setEditedProfile(null); // Close the edit dialog
  };
  

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filteredProfiles = profileList.filter(profile => {
      const nameMatch = profile.profile_name.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = profile.Description.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descriptionMatch;
    });
    setProfileList(filteredProfiles);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setProfileList(profilesData); // Reset profile list to original
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>MapiFy</h1>
        <div className="search-box">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange} />
          <button className="search-button" onClick={handleSearch}>Search</button>
          <button className="clear-search-button" onClick={clearSearch}>Clear</button>
        </div>
        <button className="header-button" onClick={() => setIsAddProfileDialogOpen(true)}>Add Profile</button>
      </div>
      <div className="section" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <h2>Profiles</h2>
        {profileList.map((profile, index) => (
          <div key={index} className="profile">
            <div className="profile-info">
              <div className="profile-photo">
                {profile.pic_url ? <img src={profile.pic_url} alt={profile.profile_name} /> : <div className="default-pic">No Photo</div>}
              </div>
              <p1>{profile.profile_name}</p1>
              <p2>{profile.Description}</p2>
            </div>
            <div className="button-group">
              <button className="button" onClick={() => handleSummaryClick(profile)}>Summary</button>
              <button className="button deleteicon" onClick={() => handleDeleteProfile(profile)}>Delete</button>

              <button className="button" onClick={() => handleEditProfile(profile)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {selectedProfile && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-content">
              <div className="description">
                <h2>{selectedProfile.profile_name}</h2>
              </div>
              <div className="map">
                <button onClick={handleShowMap}>Hide Map</button>
                {showMap && <MapComponent location={selectedProfile.location} />}
              </div>
            </div>
            <button onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
      {editedProfile && (
        <div className="edit-dialog-overlay">
          <div className="edit-dialog">
            <h2>Edit Profile</h2>
            <input type="text" name="profile_name" value={editedProfile.profile_name} onChange={handleInputChange} />
            <input type="text" name="Description" value={editedProfile.Description} onChange={handleInputChange} />
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => setEditedProfile(null)}>Exit</button>
          </div>
        </div>
      )}
     

      {/* Add Profile Dialog */}
      {isAddProfileDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Add Profile</h2>
            <input type="text" name="profile_name" placeholder="Profile Name" value={newProfile.profile_name} onChange={handleNewProfileInputChange} />
            <input type="text" name="Description" placeholder="Description" value={newProfile.Description} onChange={handleNewProfileInputChange} />
            <input type="text" name="location" placeholder="Location" value={newProfile.location} onChange={handleNewProfileInputChange} />
            <div className="button-group">
    <button className="green" onClick={handleCreateProfile}>Submit</button>
    <button className="blue" onClick={() => setNewProfile({ profile_name: '', Description: '', location: '' })}>Clear</button>
    <button className="red" onClick={() => setIsAddProfileDialogOpen(false)}>Cancel</button>
</div>
          </div>
        </div>
      )}
      

      <footer className="footer">
        <p>&copy; 2024 MapiFy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
