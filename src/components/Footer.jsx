import React, { Component } from 'react'
import "./footerstyle.css"
import { Container, Row, Col, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'

export class Footer extends Component {
  render() {
    return (
      <Container className="containers">
        <Image src="/assets/linkedin-logo.png" className="mt-4" />
        <Row className="mt-4 flex-column">

          <div className="d-flex">
            <Col xs={2}>
              <div className="d-flex flex-column">
                <Link to="/">About</Link>
                <Link to="/">Community Guidelines</Link>
                <Link to="/">

                  <select id="privacy">
                    <option>
                      Privacy and Terms
                      </option>
                  </select>
                </Link>
                <Link to="/">Sales Solutions</Link>
                <Link to="/">Safety Center</Link>
              </div>
            </Col>

            <Col xs={2}>
              <div className="d-flex flex-column">
                <Link to="/">Accessibility</Link>
                <Link to="/">Accessibility</Link>
                <Link to="/">Careers</Link>
                <Link to="/">Ad Choices</Link>
                <Link to="/">Mobile</Link>
              </div>
            </Col>

            <Col xs={2}>
              <div className="d-flex flex-column">
                <Link to="/">Talent Solutions</Link>
                <Link to="/">Marketing Solutions</Link>
                <Link to="/">Advertising</Link>
                <Link to="/">Small Business</Link>
              </div>
            </Col>

            <Col xs={3}>
              <div className="d-flex flex-column">
                <Link to="/">
                  Questions?
                    <p href="#">Visit our Help Center.</p>
                </Link>
                <Link to="/">
                  Manage your account and privacy
                    <p href="#">Go to your Settings.</p>
                </Link>

              </div>
            </Col>

            <Col xs={3}>
              <div className="d-flex flex-column">

                <label>Select Language</label>
                <select>
                  <option>
                    English (english)
                    </option>
                </select>
              </div>
            </Col>
          </div>


          <p className="ml-2">LinkedIn Corporation © 2020</p>


        </Row>


      </Container>
    )
  }
}

export default Footer
