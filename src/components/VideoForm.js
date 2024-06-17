import React, { useState, useRef, useEffect } from "react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { PlusIcon } from "lucide-react"
import DropdownMenu from "./DropdownMenu"
import "../styles/form.scss"
import VideoUploadModal from "./VideoUploadModal"

const VideoForm = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [isVideoUploadModalVisible, setVideoUploadModalVisible] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const editorRef = useRef(null)
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleAddVideo = () => {
    setVideoUploadModalVisible(true)
  }

  const handlePostVideo = ({ url }) => {
    setVideoUrl(url)

    if (url && editorRef.current) {
      const editor = editorRef.current.editor
      editor.model?.change(writer => {
        const mediaElement = writer.createElement("media", {
          url,
        })
        editor.model.insertContent(mediaElement, editor.model.document.selection)
      })
    }
  }

  return (
    <div className="form-container">
      <CKEditor
        editor={ClassicEditor}
        config={{
          htmlSupport: {
            allow: [
              {
                name: "iframe",
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          },
        }}
        onReady={editor => {
          editorRef.current = { editor }
        }}
      />
      <div className="plusIcon">
        <button onClick={toggleDropdown}>
          <PlusIcon size={18} />{" "}
        </button>
        {isDropdownVisible && <DropdownMenu onAddVideo={handleAddVideo} />}
      </div>
      {isVideoUploadModalVisible && (
        <VideoUploadModal
          onClose={() => setVideoUploadModalVisible(false)}
          onPost={handlePostVideo}
        />
      )}
    </div>
  )
}

export default VideoForm
