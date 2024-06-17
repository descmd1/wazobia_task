import React, { useRef } from "react"
import "../styles/imagemodal.scss"

const ImageUploadModal = ({ onClose, onImageUpload }) => {
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    const file = fileInputRef.current?.files[0]
    if (file) {
      onImageUpload(file)
      onClose()
    } else {
      console.error("No file selected.")
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="info">
          <h2>Embed</h2>
          <h4>Upload Image</h4>
          <h5>File Upload</h5>
        </div>
        <div className="upload-container">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            id="file-input"
            style={{ display: "none" }}
          />
          <label htmlFor="file-input" className="file-input-label">
            <button className="upload-button" onClick={() => fileInputRef.current.click()}>
              Import Image from Device
            </button>
          </label>
        </div>
        <div className="btn-box">
          <button className="confirm-button" onClick={handleUploadClick}>
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

export default ImageUploadModal
