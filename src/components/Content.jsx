import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap'
import Jumbotron from './Jumbotron'
import SideContent from './SideContent'
import UserContent from './UserContent'
import Experiences from './Experiences'
import { Spinner } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import "./MainCss.css"

class Content extends Component {

    state = {
        userInfo: undefined,
        userId: this.props.match.params.userID,
        loading: true,
    }

    fetchFunction = async () => {
        // let resp = await fetch("https://striveschool.herokuapp.com/api/profile/" + this.state.userId, {
        //     headers: new Headers({
        //         'Authorization': 'Basic ' + this.props.authoKey,
        //         "Content-Type": "application/json",
        //     }),
        // })
        let resp = await fetch("https://linkedin-team.herokuapp.com/profiles/" + this.state.userId)

        if (resp.ok) {
            let respObj = await resp.json()
            this.setState({
                userInfo: respObj,
                loading: false
            }, () => this.props.getUserImg(this.state.userInfo.image))
        }

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.userId !== this.props.match.params.userID) {
            this.setState({
                userId: this.props.match.params.userID
            }, () => {
                this.fetchFunction()
                this.props.getUserImg(this.state.userInfo.image)
            });
            // doing the fetch again
            // save userInfo in the state
        }
    }

    componentDidMount = () => {
        this.fetchFunction()
    }

    render() {
        return (
            <Container className="content mt-4 mb-4">
                {this.state.loading &&
                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: "100vh" }}>
                        <Spinner style={{ fontSize: "200px" }} animation="grow" variant="secondary" />
                    </div>
                }
                <Row>
                    {this.state.userInfo &&
                        <>
                            <Col md={9} className="d-flex flex-column mb-3 " >
                                <Jumbotron username={this.props.username} authoKey={this.props.authoKey} profileInfo={this.state.userInfo} />
                                <UserContent username={this.props.username} profileInfo={this.state.userInfo} />
                                <Experiences username={this.props.username} authoKey={this.props.authoKey} userID={this.state.userInfo.username} />
                            </Col>
                            <Col md={3} className="sideContent pl-4 pt-4">
                                <SideContent props={this.props} />
                            </Col>

                        </>
                    }
                </Row>

            </Container >
        );
    }
}
export default Content;