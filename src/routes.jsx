import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import About from './pages/About'
import Admissions from './pages/Admissions'
import Contact from './pages/Contact'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import StudentLife from './pages/StudentLife'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:slug" element={<CourseDetail />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="student-life" element={<StudentLife />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
