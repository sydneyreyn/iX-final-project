import * as React from "react"
import { Link } from "react-router-dom"
import Navbar from "../navbar/navbar"
import "./my-profile.css"
import gql from "graphql-tag"

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap"
import { Query } from "react-apollo"
import logo from "./profile-logo.png"

const GET_MYRECIPES = gql`
  query {
    me {
      name
      recipes {
        name
        description
        category {
          name
        }
      }
    }
  }
`

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Navbar history={this.props.history} className="navbar" />
        </div>
        <h1 id="mycookbook">
          <img src={logo} alt="My cookbook" />{" "}
        </h1>
        <div>
          <Link to="/my-profile/create-recipe">
            <button type="button" className="newrecipebutton">
              Create new recipe!
            </button>
          </Link>
        </div>

        <div className="likedposts">
          <h2 className="likedtitle" id="likedtitle">
            LIKED POSTS
          </h2>
          <div> POSTS GO HERE</div>
        </div>
        <h2 className="myrecipestitle" id="myrecipestitle">
          MY RECIPES
        </h2>
        <div className="myrecipes">
          <Query query={GET_MYRECIPES}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "Loading..."
              }
              if (error) {
                return "Oops, something blew up."
              }
              if (!data.me.recipes) return "no data..."
              return data.me.recipes.map(recipe => {
                return (
                  <div className="each_card">
                    <Card>
                      <CardImg
                        className="image"
                        top
                        width="100%"
                        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardTitle>{recipe.name}</CardTitle>
                        <CardText id="cardtext">{recipe.description}</CardText>
                        <CardText id="cardtext">{recipe.category}</CardText>
                        <Button>More</Button>
                      </CardBody>
                    </Card>
                  </div>
                )
              })
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default MyProfile
