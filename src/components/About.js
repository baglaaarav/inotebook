import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/notecontext'

const About = () => {
  const angle = useContext(NoteContext)
  useEffect(() => {

    angle.update()
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      this is About {angle.state.name}
    </div>
  )
}

export default About
