import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Modal, FormControl, Button } from 'react-bootstrap'
import FeedContent from './FeedContent'
import FeedPosts from './FeedPosts'
import RightSideFeed from './RightSideFeed'
import LeftSideBar from "./LeftSideBar"
import { TiCameraOutline } from 'react-icons/ti'
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs'
import { FiFileText } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'

class Feed extends Component {

    state = {
        feeds: [],
        loading: true,
        showModal: false,
        newPost: {
            text: ''
        },
        image: '',
        userId: '',
        postId: ''
    }

    fetchPosts = async () => {

        await fetch("https://linkedin-team.herokuapp.com/profiles")
            .then(resp => resp.json())
            .then(respObj =>
                respObj.data.filter(user => user.username === this.props.username).map((user, i) => this.setState({ userId: user._id })))

        await fetch("https://linkedin-team.herokuapp.com/posts")
            .then(resp => resp.json())
            .then(respObj => this.setState({
                feeds: respObj.reverse(),
                loading: false
            }))
    }

    saveImg = (event) => {
        let photo = new FormData()
        photo.append('image', event.target.files[0])
        this.setState({
            image: photo
        });
    }

    componentDidMount() {

        this.fetchPosts()
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    newPostHandler = (event) => {
        const newPost = this.state.newPost
        newPost.text = event.currentTarget.value
        this.setState({
            newPost
        });
    }

    postNewPost = async () => {
        const resp = await fetch("https://linkedin-team.herokuapp.com/posts", {
            method: "POST",
            body: JSON.stringify({ ...this.state.newPost, "user": this.state.userId }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
        const data = await resp.json()
        const id = data

        setTimeout(async () => {

            const resp = await fetch("https://linkedin-team.herokuapp.com/posts/" + id + "/image", {
                method: "POST",
                body: this.state.image,
            }, 2000)
        })

        if (resp.ok) {
            alert("You posted some new content!")
            this.setState({
                showModal: false
            });
            // window.location.reload()
        }
    }

    render() {
        // console.log(this.state.userId)
        console.log("postId: ", this.state.postId)
        console.log("userId: ", this.state.userId)
        return (

            <Container className="content mt-4 mb-4">

                {this.state.loading ?
                    <>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: "100vh" }}>
                            <Spinner style={{ fontSize: "200px" }} animation="grow" variant="secondary" />
                        </div>
                    </>
                    :
                    <Row>
                        {this.state.feeds &&
                            <>
                                <Col md={3} className="d-flex flex-column mb-3" >
                                    {this.props.users && this.props.users.filter(user => user.username === this.props.username).map((user, i) =>
                                        <LeftSideBar key={user._id} info={user} />
                                    )}
                                </Col>
                                <Col md={6} className="d-flex flex-column mb-3 " >
                                    <FeedContent addNewPost={this.showModal} />
                                    {this.state.feeds && this.props.users && this.state.feeds.map((post, i) =>
                                        <>
                                            <FeedPosts
                                                key={post.user._id}
                                                users={this.props.users}
                                                userImage={this.props.userImage}
                                                authoKey={this.props.authoKey}
                                                src={this.props.src} key={i}
                                                loading={this.state.loading}
                                                info={post} />
                                        </>
                                    )}
                                </Col>
                                <Col md={3} className="sideContent">
                                    <RightSideFeed />
                                </Col>

                            </>
                        }
                    </Row>
                }
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            type="text"
                            onChange={this.newPostHandler}
                            placeholder="What do you want to talk about?"
                            className="mr-sm-2" />
                    </Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div className="modalIcons p-3 d-flex">
                            <AiOutlinePlus />
                            <div>
                                <label htmlFor="upload">
                                    <TiCameraOutline />
                                </label>
                            </div>
                            <input
                                style={{ display: "none" }}
                                type="file" id="upload"
                                profile="file"
                                onChange={this.saveImg}
                                accept="image/*" />
                            <BsCameraVideo />
                            <FiFileText />
                        </div>
                        <div className="p-3 ">
                            <Button onClick={this.postNewPost}>POST</Button>
                        </div>
                    </div>
                </Modal>


            </Container >
        );
    }
}

export default Feed;