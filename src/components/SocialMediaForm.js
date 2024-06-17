import React, { useState, useRef } from "react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { PlusIcon } from "lucide-react"
import DropdownMenu from "./DropdownMenu"
import "../styles/form.scss"
import SocialMediaEmbedModal from "./SocialMediaEmbedModal"

const SocialMediaForm = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const [isSocialMediaEmbedModalVisible, setSocialMediaEmbedModalVisible] = useState(false)

  const editorRef = useRef(null)

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleAddSocial = () => {
    setSocialMediaEmbedModalVisible(true)
  }

  //social media links  upload
  const handleEmbedSocialMedia = ({ platform, link, iframeCode }) => {
    console.log("Received values:", { platform, link, iframeCode })

    if (!platform || !link) {
      console.error("Platform or link is missing.")
      return
    }

    let socialHtml = `<a href="${link}" target="_blank">${link}</a>`
    if (iframeCode) {
      socialHtml += `<iframe src="${iframeCode}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    }

    if (editorRef.current) {
      const editor = editorRef.current.editor
      const currentContent = editor.getData()
      editor.setData(currentContent + socialHtml)
    } else {
      console.error("Editor is not initialized or URL is invalid.")
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
        {isDropdownVisible && <DropdownMenu onAddSocial={handleAddSocial} />}
      </div>

      <div className="">
        {isSocialMediaEmbedModalVisible && (
          <SocialMediaEmbedModal
            onClose={() => setSocialMediaEmbedModalVisible(false)}
            onPost={handleEmbedSocialMedia}
          />
        )}
      </div>
    </div>
  )
}

export default SocialMediaForm
