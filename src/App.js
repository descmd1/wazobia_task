import React from "react"
import { Route, Routes, NavLink, useLocation, useNavigate } from "react-router-dom"
import ImageForm from "./components/ImageForm"
import VideoForm from "./components/VideoForm"
import SocialMediaForm from "./components/SocialMediaForm"
import "./styles/form.scss"

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // adding pagination

  const pages = [
    { path: "/", label: "1" },
    { path: "/video", label: "2" },
    { path: "/social", label: "3" },
  ]

  const currentPageIndex = pages.findIndex(page => page.path === location.pathname)

  const handlePrevious = () => {
    const previousPageIndex = (currentPageIndex - 1 + pages.length) % pages.length
    navigate(pages[previousPageIndex].path)
  }

  const handleNext = () => {
    const nextPageIndex = (currentPageIndex + 1) % pages.length
    navigate(pages[nextPageIndex].path)
  }

  return (
    <div className="App">
      <div className="form-box">
        <Routes>
          <Route path="/social" element={<SocialMediaForm />} />
          <Route path="/video" element={<VideoForm />} />
          <Route path="/" element={<ImageForm />} />
        </Routes>
      </div>

      <nav>
        <ul className="pagination-buttons">
          <li onClick={handlePrevious}>
            <KeyboardArrowLeft />
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <NavLink to={page.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {page.label}
              </NavLink>
            </li>
          ))}
          <li onClick={handleNext}>
            <KeyboardArrowRight />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default App
