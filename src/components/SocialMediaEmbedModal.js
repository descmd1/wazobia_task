import React, { useState } from "react"
import "../styles/VideoUploadModal.scss"
import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"
import { FormControlLabel } from "@mui/material"

const SocialMediaEmbedModal = ({ onClose, onPost }) => {
  const [platform, setPlatform] = useState("Facebook")
  const [link, setLink] = useState("")
  const [iframeCode, setIframeCode] = useState("")

  //toggle switch
  const IOSSwitch = styled(props => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }))

  // handling of social media platforms
  const handlePlatformChange = e => {
    setPlatform(e.target.value)
  }

  const handleLinkChange = e => {
    setLink(e.target.value)
  }

  const handleIframeCodeChange = e => {
    setIframeCode(e.target.value)
  }

  const handlePost = () => {
    if (!platform || !link) {
      console.error("Platform or link is missing.")
      return
    }
    onPost({ platform, link, iframeCode })
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
            <label htmlFor="platform">Social Media Platform</label>
            <select id="platform" value={platform} onChange={handlePlatformChange}>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>
          <div>
            <label htmlFor="link">URL</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={handleLinkChange}
              placeholder="Enter the social media link"
            />
          </div>
          <div>
            <label htmlFor="iframeCode">Code</label>
            <input
              type="text"
              id="iframeCode"
              value={iframeCode}
              onChange={handleIframeCodeChange}
              placeholder="Enter the iframe code"
            />
          </div>
          <div className="toggle-caption">
            <span>Disable caption</span>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              //   label="iOS style"
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

export default SocialMediaEmbedModal
