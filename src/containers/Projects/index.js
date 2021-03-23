import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";
import FaIcons from "../../components/fa-icons";
import useNotify from "../../actions/Toast";

import cloneDeep from "lodash/cloneDeep";
import _includes from "lodash/includes";

import Card from "./card";
import Modal from "./Add";
import { editProject, getProjects, saveProject } from "./service";

function Projects() {
  const history = useHistory();
  const { notify } = useNotify();
  const [projects, setProjects] = useState([]);

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

  const onSetup = (project) => {
    history.push({
      pathname: "/App/Projects/Setup/Scenarios",
      state: { projectId: project.id },
    });
  };

  const onView = () => {
    history.push("/App/Projects/View");
  };

  const onFormSubmit = () => {
    if (mode === "SETUP") onSave();
    else onEdit();
  };

  const onEdit = () => {
    editProject(formData)
      .then((res) => {
        notify(
          `${formData.project_name} project has been saved successfully.`,
          "success"
        );
        onFormCancel();
        onLoad();
      })
      .catch((err) =>
        notify(`Oops! Failed to add save project ${formData.name}.`, "error")
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
      .catch((err) =>
        notify(
          `Oops! Failed to add new project ${formData.project_name}.`,
          "error"
        )
      );
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
                _includes(item.project_name, searchKey)
              )
                return true;
              return false;
            })
            .map((item) => {
              return <Card onSetup={onSetup} onView={onView} project={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Projects;
