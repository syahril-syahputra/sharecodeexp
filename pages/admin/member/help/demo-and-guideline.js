import React from 'react'
import Admin from 'layouts/Admin.js'

export default function DemoAndGuideline() {
  return (
    <div className="bg-white p-8 text-red-500 font-bold text-2xl text-center">
      This page is under maintenance
    </div>
    // <div className="bg-white p-8 text-red-500 font-bold text-2xl text-center space-y-8">
    //   <h1>Singapore</h1>
    //   <video
    //     controls
    //     autoPlay
    //     className="w-full"
    //     src="https://exepart-secondary-spaces.sgp1.digitaloceanspaces.com/example-video/testing-do-spaces.mp4"
    //   />

    //   <h1>San fransisco</h1>
    //   <video
    //     controls
    //     className="w-full"
    //     src="https://exepart-tertiary-spaces.sfo2.digitaloceanspaces.com/example-video/testing-do-spaces.mp4"
    //   />
    // </div>
  )
}
DemoAndGuideline.layout = Admin
