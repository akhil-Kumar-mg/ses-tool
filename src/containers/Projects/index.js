import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../components/fa-icons";
import useNotify from "../../actions/Toast";

import cloneDeep from "lodash/cloneDeep";
import _includes from "lodash/includes";

import Card from "./card";
import Modal from "./Add";
import {
  deleteProject,
  editProject,
  getProjects,
  saveProject,
} from "./service";
import { Context as AppContext } from "../../context/AppContext";

function Projects() {
  const history = useHistory();
  const { notify } = useNotify();
  const [projects, setProjects] = useState([]);
  const appContext = useContext(AppContext);

  const initialState = {
    project_name: "",
    customer_name: "",
    country_name: "",
    sales_manager: "",
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("SETUP");
  const [searchKey, setSearchKey] = useState("");
  const [formData, setFormData] = useState(cloneDeep(initialState));

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    getProjects()
      .then((res) => {
        setProjects(res);
      })
      .catch((err) => notify("Oops! Failed to fetch project list.", "error"));
  };

  const handleShow = () => {
    setMode("SETUP");
    setShow(true);
  };

  const onChange = (project, mode) => {
    if (mode === "EDIT") {
      setFormData(cloneDeep(project));
      setMode("EDIT");
      setShow(true);
    } else if (mode === "DELETE") {
      onDelete(project);
    }
  };

  const onSetup = (project) => {
    appContext.selectedProject({ selectedProject: project.id });
    history.push({
      pathname: `/App/Projects/${project.id}/Setup/Scenarios`,
      state: { projectId: project.id },
    });
  };

  const onView = (project) => {
    appContext.selectedProject({ selectedProject: project.id });
    history.push({
      pathname: `/App/Projects/${project.id}/View`,
      state: { projectId: project.id, projectName: project.project_name },
    });
  };

  const onFormSubmit = () => {
    if (mode === "SETUP") onSave();
    else onEdit();
  };

  const onDelete = (data) => {
    const r = window.confirm(
      `Do you wish to remove '${data.project_name}' project?`
    );
    if (r === true) {
      deleteProject(data.id)
        .then((res) => {
          notify(
            `'${data.name}' project has been removed successfully.`,
            "success"
          );
          onLoad();
        })
        .catch((err) =>
          notify(
            `Oops! Failed to remove ${data.project_name} project.`,
            "error"
          )
        );
    } else {
    }
  };

  const onEdit = () => {
    editProject(formData)
      .then((res) => {
        notify(
          `${formData.project_name} project has been edited successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to edit project ${formData.name}.`, "error")
      );
  };

  const onSave = () => {
    saveProject(formData)
      .then((res) => {
        notify(
          `${formData.project_name} project has been added successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) => {
        if (err.response.data && err.response.data.error) {
          notify(
            err.response.data.error,
            "error"
          );
        }
      });
  };
  const onFormCancel = () => {
    setShow(false);
    setFormData(cloneDeep(initialState));
  };
  return (
    <>
      <Modal
        show={show}
        onCancel={onFormCancel}
        formData={formData}
        onChange={setFormData}
        onSubmit={onFormSubmit}
        mode={mode}
      />
      <div className="project-container">
        <div className="header">
          <h1>Projects</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for projects"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShow}
          >
            ADD PROJECT <FaIcons icon="plus" />
          </button>
        </div>
        <div className="sub-container">
          {projects
            .filter((item) => {
              if (
                searchKey.length == 0 ||
                _includes(
                  item.project_name.toLowerCase(),
                  searchKey.toLowerCase()
                )
              )
                return true;
              return false;
            })
            .map((item, index) => {
              return (
                <Card
                key={index}
                  onSetup={onSetup}
                  onView={onView}
                  project={item}
                  onChange={onChange}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Projects;
