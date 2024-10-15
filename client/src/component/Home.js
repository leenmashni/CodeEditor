import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import Modal from "react-modal"; // Make sure to install react-modal
import Avatar from 'react-avatar';
import { Dropdown } from 'react-bootstrap'; // Import Dropdown from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCog } from 'react-icons/fa';

Modal.setAppElement("#root"); // Required for accessibility

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [myProjects, setMyProjects] = useState([]);
  const [visitedProjects, setVisitedProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectUsers, setNewProjectUsers] = useState("");
  const [email, setEmail] = useState("user@example.com"); // Default email
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const openSettingsModal = () => setSettingsModalIsOpen(true);
  const closeSettingsModal = () => setSettingsModalIsOpen(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const EditProject = (project) => {
    setSelectedProject(project);
    setShowEditModal(true); // Set modal to visible
  };
  
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProject(null);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault(); // Prevent page reload
    // Implement your save logic here
    closeEditModal();
  };


  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  

  const handleLogout = () => {
    // Add your logout logic here, if needed
    navigate('/'); // Navigate to login page on logout
  };

  const joinRoom = (project) => {
    navigate(`/editor/${project.roomId}`);
  };

  const createNewProject = (e) => {
    e.preventDefault();
    const newProject = {
      projectName: newProjectName,
      users: newProjectUsers.split(",").map((user) => user.trim()) // Split and trim users
    };

    const updatedProjects = [...myProjects, newProject];
    setMyProjects(updatedProjects);
    localStorage.setItem("myProjects", JSON.stringify(updatedProjects));

    toast.success("New project created");
    closeModal(); // Close the modal after creating the project
  };

  return (
    <div className="container-fluid bg-dark text-light">
      {/* Top Bar with Avatar and Settings */}
      <div className="row py-2 px-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
        <h2 className="col-md-6 text-light">Project Dashboard</h2>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          {/* Dropdown for Avatar */}
          <Dropdown align="end">
            <Dropdown.Toggle as="div" id="dropdown-avatar" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {/* Display the uploaded avatar if available */}
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                <Avatar name={username} size="40" round={true} className="me-2" />
              )}
            </Dropdown.Toggle>

            {/* Dropdown Menu */}
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item onClick={() => navigate('/Profile')}>Profile Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="row min-vh-100">
        {/* Left Panel: Projects List */}
<div className="col-md-4 p-4 border-right border-secondary">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Your Projects</h4>
        <button className="btn btn-success" onClick={openModal}>
          New
        </button>
      </div>

      <ul className="list-group mb-4 bg-dark text-light">
        {myProjects.length === 0 ? (
          <li className="list-group-item bg-dark text-light">
            No projects yet
          </li>
        ) : (
          myProjects.map((project, index) => (
            <li className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center" key={index}>
              <div className="d-flex align-items-center">
                <FaCog
                  onClick={openSettingsModal} 
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                />
                <span>{project.projectName}</span>
              </div>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => joinRoom(project)}
              >
                Join
              </button>
                </li>
              ))
            )}
          </ul>

          <h4 className="mb-4">Visited Projects</h4>
          <ul className="list-group bg-dark text-light">
            {visitedProjects.length === 0 ? (
              <li className="list-group-item bg-dark text-light">
                No projects visited
              </li>
            ) : (
              visitedProjects.map((project, index) => (
                <li className="list-group-item bg-dark text-light d-flex justify-content-between" key={index}>
                  <span>
                    {project.projectName} (Visited by: {project.username})
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => joinRoom(project)}
                  >
                    Join
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
       
      {/* Modal for Creating New Project */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Create New Project"
  style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',   // Define your width
      height: '300px',  // Define your height
      backgroundColor: '#343a40',  // Dark background to match theme
      color: '#fff',  // Text color
      borderRadius: '8px',  // Rounded corners
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',  // Semi-transparent black background
    }
  }}
>
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">Create New Project</h5>
    </div>
    <div className="modal-body">
      <form onSubmit={createNewProject}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="form-control mb-3"
            placeholder="Enter project name"
            required
          />
        </div>
        <div className="form-group">
          <label>Users (comma separated)</label>
          <input
            type="text"
            value={newProjectUsers}
            onChange={(e) => setNewProjectUsers(e.target.value)}
            className="form-control mb-3"
            placeholder="Enter users"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Create Project
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</Modal>
 
{/* Edit Project Modal */}
<Modal
        isOpen={settingsModalIsOpen}
        onRequestClose={closeSettingsModal}
        contentLabel="Edit Project"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',   // Define your width
            height: '300px',  // Define your height
            backgroundColor: '#343a40',  // Dark background to match theme
            color: '#fff',  // Text color
            borderRadius: '8px',  // Rounded corners
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',  // Semi-transparent black background
          }
        }}
      >
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Edit Project</h5>
          </div>
          <div className="modal-body">
            {selectedProject && (
              <form onSubmit={EditProject}>
              <div className="form-group">
                <label>Edit Project Name</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Users (comma separated)</label>
                <input
                  type="text"
                  value={newProjectUsers}
                  onChange={(e) => setNewProjectUsers(e.target.value)}
                  className="form-control mb-3"
                  placeholder="Enter users"
                />
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  Create Project
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
