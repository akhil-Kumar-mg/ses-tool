import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function Form({ formData, onChange }) {
  const onFormChange = (key, value) => {
    const _formData = cloneDeep(formData);
    _formData[key] = value;
    onChange({ ..._formData });
  };

  return (
    <>
      <form className="ses-form">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>ABR Video Profiles(Mbps comma separated)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.abr_video}
                onChange={(e) => onFormChange("abr_video", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>ABR # of Audio Tracks</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.abr_audio}
                onChange={(e) => onFormChange("abr_audio", e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label>ABR Total Bitrate</label>
              <input
                type="number"
                placeholder="Content"
                className="form-control"
                value={formData.abr_bit_rate}
                onChange={(e) => onFormChange("abr_bit_rate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label>VOD Storage GB/h</label>
              <input
                type="number"
                placeholder="Content"
                className="form-control"
                value={formData.vod_storage}
                onChange={(e) => onFormChange("vod_storage", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-VOD</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.vod_hit_rate}
                onChange={(e) => onFormChange("vod_hit_rate", e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-Linear</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.linear_hit_rate}
                onChange={(e) =>
                  onFormChange("linear_hit_rate", e.target.value)
                }
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label>Origin Hitrate-Catchup</label>
              <input
                type="number"
                className="form-control"
                placeholder="Content"
                value={formData.catchup_hit_rate}
                onChange={(e) =>
                  onFormChange("catchup_hit_rate", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row top-buffer">
          <div className="col-sm-2">
            <div className="form-group">
              <label> Linear Transcoding</label>
              <input
                type="text"
                maxLength={1}
                className="form-control"
                placeholder="Content"
                value={formData.linear_transcoding}
                onChange={(e) =>
                  onFormChange("linear_transcoding", e.target.value)
                }
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group">
              <label>SES360 License</label>
              <input
                type="number"
                max={10}
                maxLength={1}
                className="form-control"
                placeholder="Content"
                value={formData.ses_360_license}
                onChange={(e) =>
                  onFormChange("ses_360_license", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="geo_blocking"
                checked={formData.geo_blocking}
                onChange={(e) =>
                  onFormChange("geo_blocking", !formData.geo_blocking)
                }
                
              />
              <label className="custom-control-label" htmlFor="geo_blocking">
                Geo Blocking
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="drm"
                checked={formData.drm}
                onChange={(e) =>
                  onFormChange("drm", !formData.drm)
                }
                
              />
              <label className="custom-control-label" htmlFor="drm">
                DRM
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="ses_cj"
                checked={formData.ses_cj}
                onChange={(e) =>
                  onFormChange("ses_cj",  !formData.ses_cj)
                }
                
              />
              <label className="custom-control-label" htmlFor="ses_cj">
                SES CJ
              </label>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="download_to_go"
                checked={formData.download_to_go}
                onChange={(e) =>
                  onFormChange("download_to_go", !formData.download_to_go)
                }
                
              />
              <label className="custom-control-label" htmlFor="download_to_go">
                Download to Go
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="download_to_on"
                checked={formData.download_to_on}
                onChange={(e) =>
                  onFormChange("download_to_on", !formData.download_to_on)
                }
                
              />
              <label className="custom-control-label" htmlFor="download_to_on">
                Dowload to Own
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="tvod"
                checked={formData.tvod}
                onChange={(e) =>
                  onFormChange("tvod", !formData.tvod)
                }
                
              />
              <label className="custom-control-label" htmlFor="tvod">
                TVOD
              </label>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="npvr"
                checked={formData.npvr}
                onChange={(e) =>
                  onFormChange("npvr", !formData.npvr)
                }
                
              />
              <label className="custom-control-label" htmlFor="npvr">
                nPVR
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="qoe_analytics"
                checked={formData.qoe_analytics}
                onChange={(e) =>
                  onFormChange("qoe_analytics", !formData.qoe_analytics)
                }
                
              />
              <label className="custom-control-label" htmlFor="qoe_analytics">
                QoE Analytics+
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="apps_analytics"
                checked={formData.apps_analytics}
                onChange={(e) =>
                  onFormChange("apps_analytics", !formData.apps_analytics)
                }
                
              />
              <label className="custom-control-label" htmlFor="apps_analytics">
                Apps Analytics+
              </label>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="advanced_recommendation_content"
                checked={formData.advanced_recommendation_content}
                onChange={(e) =>
                  onFormChange("advanced_recommendation_content", !formData.advanced_recommendation_content)
                }
                
              />
              <label className="custom-control-label" htmlFor="advanced_recommendation_content">
                Advanced Recommendation Content wise
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="tv_box_app"
                checked={formData.tv_box_app}
                onChange={(e) =>
                  onFormChange("tv_box_app", !formData.tv_box_app)
                }
                
              />
              <label className="custom-control-label" htmlFor="tv_box_app">
                TV-Box Apps
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="operator_app"
                checked={formData.operator_app}
                onChange={(e) =>
                  onFormChange("operator_app", !formData.operator_app)
                }
                
              />
              <label className="custom-control-label" htmlFor="operator_app">
                Operator Apps
              </label>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="managed_stb"
                checked={formData.managed_stb}
                onChange={(e) =>
                  onFormChange("managed_stb", !formData.managed_stb)
                }
                
              />
              <label className="custom-control-label" htmlFor="managed_stb">
                Managed STBs
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="smart_tv_app"
                checked={formData.smart_tv_app}
                onChange={(e) =>
                  onFormChange("smart_tv_app", !formData.smart_tv_app)
                }
                
              />
              <label className="custom-control-label" htmlFor="smart_tv_app">
                Smart TV Apps
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="super_aggregator"
                checked={formData.super_aggregator}
                onChange={(e) =>
                  onFormChange("super_aggregator", !formData.super_aggregator)
                }
                
              />
              <label className="custom-control-label" htmlFor="super_aggregator">
                Super Aggregator
              </label>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="player_analytics"
                checked={formData.player_analytics}
                onChange={(e) =>
                  onFormChange("player_analytics", !formData.player_analytics)
                }
                
              />
              <label className="custom-control-label" htmlFor="player_analytics">
                Player Analytics+
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="enhanced_trending"
                checked={formData.enhanced_trending}
                onChange={(e) =>
                  onFormChange("enhanced_trending", !formData.enhanced_trending)
                }
                
              />
              <label className="custom-control-label" htmlFor="enhanced_trending">
                Enhanced Trending
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
