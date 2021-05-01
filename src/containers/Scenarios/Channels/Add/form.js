import React, { useState, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import { Context as AppContext } from "../../../../context/AppContext";

function Form({ formData, onChange }) {
  const appContext = useContext(AppContext);
  const {
    channel_quality,
    source_type,
    ad_cue_tones,
    subtitles,
  } = appContext.state;

  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>Type name</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.type}
            onChange={(e) => onFormChange("type", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Catch up hours</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.catchup_hours}
            onChange={(e) => onFormChange("catchup_hours", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Source mpbs</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.source_mbps}
            onChange={(e) => onFormChange("source_mbps", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Codec</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={formData.codec}
            onChange={(e) => onFormChange("codec", e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Audio type</label>
            </div>
            <div className="col">
              <label>Source type</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={formData.audio_type}
                onChange={(e) => onFormChange("audio_type", e.target.value)}
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                value={formData.source_type}
                onChange={(e) => onFormChange("source_type", e.target.value)}
              >
                <option>Select</option>
                {source_type &&
                  source_type.length &&
                  source_type.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>Subtitle type</label>
            </div>
            <div className="col">
              <label>Channel quality</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={formData.subtitle_type}
                onChange={(e) => onFormChange("subtitle_type", e.target.value)}
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                value={formData.channel_quality}
                onChange={(e) =>
                  onFormChange("channel_quality", e.target.value)
                }
              >
                <option>Select</option>
                {channel_quality &&
                  channel_quality.length &&
                  channel_quality.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col">
              <label>EPG source</label>
            </div>
            <div className="col">
              <label>Ad cue tones</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={formData.epg_source}
                onChange={(e) => onFormChange("epg_source", e.target.value)}
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                value={formData.cue_tones}
                onChange={(e) => onFormChange("cue_tones", e.target.value)}
              >
                <option>Select</option>
                {ad_cue_tones &&
                  ad_cue_tones.length &&
                  ad_cue_tones.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label># Audio tracks</label>
            </div>
            <div className="col">
              <label># Subtitles</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={formData.audio_track}
                onChange={(e) => onFormChange("audio_track", e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                value={formData.subtitle_of}
                onChange={(e) => onFormChange("subtitle_of", e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
