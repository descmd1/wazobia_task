import React from "react"
import "../styles/dropdownmenu.scss"
import { ImageIcon, VideoIcon } from "lucide-react"
import DotItem from "./DotItem"

const DropdownMenu = ({ onAddImage, onAddVideo, onAddSocial }) => {
  return (
    <div className="dropdown-menu">
      <p>EMBEDS</p>
      <div className="dropdown-item" onClick={onAddImage}>
        <div>
          <ImageIcon size={30} />
        </div>

        <div className="info">
          <span>Picture</span>
          <p>Jpeg, png</p>
        </div>
      </div>
      <div className="dropdown-item" onClick={onAddVideo}>
        <div>
          <VideoIcon size={30} />
        </div>
        <div className="info">
          <span>Video</span>
          <p>Jw player, Youtube, Vimeo</p>
        </div>
      </div>
      <div className="dropdown-item" onClick={onAddSocial}>
        <div>
          <DotItem />
        </div>
        <div className="info">
          <span>Social</span>
          <p>Instagram, Twitter, Snapchat, Facebook</p>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu
