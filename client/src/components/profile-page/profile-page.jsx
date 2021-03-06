import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"
import Feed from "../feed/feed"

import "./profile-page.css"

const GET_TWEETS = gql`
  query getTweets($username: String!) {
    userFeed(orderBy: createdAt_DESC, username: $username) {
      id
      text
      author {
        id
        name
        username
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    console.log({
      username: this.props.match.params
    })
    return (
      <div className="profile-page">
        <Navigation history={this.props.history} />
        <div className="container">
          <h1 className="user-header">{this.props.match.params.username}</h1>

          <div className="profile-feeder">
            <Query
              variables={{
                username: this.props.match.params.username
              }}
              query={GET_TWEETS}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  return (
                    <img
                      src={require("./loader.gif")}
                      className="loader"
                      alt="loader"
                    />
                  )
                }

                if (error) {
                  return "OOps, somehing blew up."
                }

                return (
                  <div className="tweet-container">
                    {data.userFeed.map(tweet => {
                      return (
                        <Tweet
                          key={tweet.id}
                          text={tweet.text}
                          author={tweet.author}
                        />
                      )
                    })}
                  </div>
                )
              }}
            </Query>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
