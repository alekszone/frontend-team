import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import './MainCss.css'
import { Link } from 'react-router-dom'

class SideContent extends React.Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        // const url = "https://striveschool.herokuapp.com/api/profile/";
        const url ="https://linkedin-team.herokuapp.com/profiles"

        const username = 'user24';
        const password = '48D4vaVh6Ra3DD8w';

        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

        fetch(url)

        // fetch(url, {
        //     method: "GET",
        //     headers: headers,
        // })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((users) => {
                this.setState({ users: users.data })
            })
    }

    render() {
        console.log(this.state.users)
        return (
            <>
                <Row className="pb-5 d-flex flex-column ">
                    <Col className="col pt-3 border-bottom">
                        <div className="d-flex justify-content-between">
                            <p>Edit public profile and URL</p>
                            <AiOutlineQuestionCircle />
                        </div>
                    </Col>
                    <Col className="col pt-3 border-bottom">
                        <div className="d-flex justify-content-between">
                            <p>Add profile in another language</p>
                            <AiOutlineQuestionCircle />
                        </div>
                    </Col>
                </Row>
                <p>People also viewed</p>
                {this.state.users.map((user, i) => {
                    return (
                        <Row key={i} className="pb-3 d-flex align-items-center">
                            <Col md={4}>
                                {user.image === undefined || user.image === ''
                                    ? <Image
                                        onClick={() => this.props.props.history.push("/profiles/" + user.username)}
                                        src='https://img.icons8.com/officel/2x/user.png'
                                        style={{ height: "4rem", width: "4rem", border: "1px solid lightgray", borderRadius: "2rem" }}
                                        className="card-img img-fluid"
                                        alt="image"
                                    />
                                    : <Image
                                        onClick={() => this.props.props.history.push("/profiles/" + user.username)}
                                        src={user.image}
                                        style={{ height: "4rem", width: "4rem", border: "1px solid lightgray", borderRadius: "2rem" }}
                                        className="card-img img-fluid"
                                        alt="image"
                                    />

                                }
                            </Col>
                            <Col className="col col-8 d-flex justify-content-between pt-3 border-bottom">
                                <div className="d-flex flex-column" onClick={() => this.props.props.history.push("/profiles/" + user.username)}>
                                    <strong>{user.name} {user.surname}</strong>
                                    <span>{user.title}</span>
                                </div>
                                <div>
                                    <span><i className="fa fa-user-plus"></i></span>
                                </div>
                            </Col>
                        </Row>
                    )
                })}
            </>
        )
    }

}

export default SideContent
