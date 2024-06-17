import React, { useState, useRef, useEffect } from "react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { PlusIcon } from "lucide-react"
import DropdownMenu from "./DropdownMenu"
import "../styles/form.scss"
import ImageUploadModal from "./ImageUploadModal"

const ImageForm = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [isImageUploadModalVisible, setImageUploadModalVisible] = useState(false)

  const editorRef = useRef(null)

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible)
  }

  const handleAddImage = () => {
    setImageUploadModalVisible(true)
  }

  //image upload
  const handleImageUpload = file => {
    if (!file) {
      return
    }

    if (editorRef.current) {
      const editor = editorRef.current.editor

      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        const currentContent = editor?.getData()
        const imageHtml = `<img src="${imageUrl}" alt="Uploaded Image"/>`
        editor?.setData(currentContent + imageHtml)
      }
      reader.readAsDataURL(file)
    } else {
      console.error("Editor is not initialized.")
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
        {isDropdownVisible && <DropdownMenu onAddImage={handleAddImage} />}
      </div>

      {isImageUploadModalVisible && (
        <ImageUploadModal
          onClose={() => setImageUploadModalVisible(false)}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  )
}

export default ImageForm
