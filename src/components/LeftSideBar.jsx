import React, { Component } from 'react'
import { Container, Image, Col, Jumbotron } from "react-bootstrap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

export class SideBar extends Component {
  render() {
    return (
      <Router>
        <div>

          <div style={{ backgroundColor: "white", border: "1px solid lightgrey", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} className="mb-4">
            <div>
              <Jumbotron fluid style={{ backgroundColor: "white", padding: "0" }}>
                <Container style={{ position: "relative", padding: "0" }}>

                  <div id="jumbotronLeftSide">
                    <Image fluid className="w-100" src="/assets/jumbotronCover.jpeg" />
                  </div>
                  <div id="profilePhotoLeftSideBar">
                    {this.props.info.image
                      ? <Image src={this.props.info.image} />
                      : <Image src='https://img.icons8.com/officel/2x/user.png' />
                    }
                  </div>
                  <h5 className="text-center">Welcome, {this.props.info.name}</h5>

                  <div className="text-center">
                    <Link to="/profiles/me">Update your profile</Link>
                  </div>

                </Container>


              </Jumbotron>
              <hr />
              <div className="p-3">

                <Link>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p>Connections <br /> Grow your network </p>
                    </div>

                    <div>
                      <p>97</p>
                    </div>
                  </div>
                </Link>

                <Link>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p>Who viewed your profile</p>
                    </div>

                    <div>
                      <p>22</p>
                    </div>
                  </div>
                </Link>

                <hr />

                <Link>
                  <p>See all Premium features</p>
                </Link>


                <hr />

                <Link>
                  <p>Saved items</p>
                </Link>
              </div>





            </div>

          </div>


          <Col style={{ backgroundColor: "white", border: "1px solid lightgrey", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
            <div>
              <h4 className="mt-3">Recent</h4>
              <Link>
                <div>
                  <h6>HTML & CSS learning group</h6>
                </div>
              </Link>

              <h4 className="mt-3">Recent</h4>
              <Link>
                <div>
                  <h6>HTML & CSS learning group</h6>
                  <p>See all</p>
                </div>
              </Link>




              <div className="d-flex justify-content-between">
                <div>
                  <p>Event</p>
                </div>

                <div>
                  <p>+</p>
                </div>
              </div>

              <hr />

              <Link>
                <p>Discover More</p>
              </Link>
            </div>

          </Col>




        </div>
      </Router>
    )
  }
}

export default withRouter(SideBar)
