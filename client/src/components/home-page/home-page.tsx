import * as React from "react"
import Navigation from "../navigation/navigation"
import Feed from "../feed/feed"
import "./home-page.css"

class HomePage extends React.Component {
  public render() {
    return (
      <div className="app">
        <Navigation />
        <div className="feeder">
          <Feed />
        </div>
      </div>
    )
  }
}

export default HomePage
