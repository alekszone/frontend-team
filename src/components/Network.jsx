import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import './MainCss.css'
import { Link } from 'react-router-dom'

class Network extends React.Component {

    state = {
        users: [],
        totalUsers: ''
    }

    componentDidMount = () => {
        const url = "https://linkedin-team.herokuapp.com/profiles"


        fetch(url)

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((users) => {
                this.setState({ users: users.data, totalUsers: users.totalUsers })
            })
    }

    render() {
        console.log(this.state.users)
        console.log(this.state.totalUsers)
        return (
            <Container className="text-center">

                <Row className="d-flex">
                    {this.state.users.map((user, i) => {
                        return (
                            <Col md={4} className="my-5">
                                <div>
                                    {user.image === undefined || user.image === ''
                                        ? <Image
                                            onClick={() => this.props.history.push("/profiles/" + user.username)}
                                            src='https://img.icons8.com/officel/2x/user.png'
                                            style={{ height: "4rem", width: "4rem", border: "1px solid lightgray", borderRadius: "2rem" }}
                                            className="card-img img-fluid"
                                            alt="image"
                                        />
                                        : <Image
                                            onClick={() => this.props.history.push("/profiles/" + user.username)}
                                            src={user.image}
                                            style={{ height: "4rem", width: "4rem", border: "1px solid lightgray", borderRadius: "2rem" }}
                                            className="card-img img-fluid"
                                            alt="image"
                                        />

                                    }
                                </div>
                                <div className="d-flex flex-column" onClick={() => this.props.history.push("/profiles/" + user.username)}>
                                    <strong>{user.name} {user.surname}</strong>
                                    <span>{user.title}</span>
                                </div>
                            </Col>
                        )
                    })}
                </Row>

            </Container>

        )
    }

}

export default Network
