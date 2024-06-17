import React, { useState } from "react"
import "../styles/VideoUploadModal.scss"

const VideoUploadModal = ({ onClose, onPost }) => {
  const [videoProvider, setVideoProvider] = useState("YouTube")
  const [videoUrl, setVideoUrl] = useState("")

  const handleProviderChange = e => {
    setVideoProvider(e.target.value)
  }

  const handleUrlChange = e => {
    setVideoUrl(e.target.value)
  }

  const handlePost = () => {
    onPost({ provider: videoProvider, url: videoUrl })
    onClose()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Embed</h2>
        <div className="form-group">
          <div>
            <label htmlFor="videoProvider">Video Provider</label>
            <select id="videoProvider" value={videoProvider} onChange={handleProviderChange}>
              <option value="YouTube">Youtube</option>
              <option value="Vimeo">Vimeo</option>
            </select>
          </div>
          <div>
            <label htmlFor="videoUrl">URL</label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={handleUrlChange}
              placeholder="https://jungle/post/Earn-Passive"
            />
          </div>
        </div>
        <div className="button-group">
          <button className="post-button" onClick={handlePost}>
            Embed
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoUploadModal
