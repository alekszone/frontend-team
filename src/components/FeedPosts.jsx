import React, { Component } from 'react';
import { Image, ListGroup, Dropdown, Accordion, Button } from 'react-bootstrap'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { GoComment } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'

class FeedPosts extends Component {

    state = {
        clicked: false,
        showDropdown: false,
        comments: [],
        newComment: {
            rate: '5',
            comment: "",
            elementId: this.props.info._id
        }
    }

    deletePost = async (id) => {
        const resp = await fetch("https://striveschool.herokuapp.com/api/posts/" + id, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Basic ' + "dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=",
            }),
        })
        if (resp.ok) {
            alert("You deleted your post!")
            this.setState({
                showDropdown: false
            });
        } else {
            alert("This is not your post!")
            this.setState({
                showDropdown: false
            });
        }
    }

    addComment = (event) => {
        const newComment = this.state.newComment
        newComment[event.currentTarget.className] = event.currentTarget.value
        this.setState({
            newComment
        });
    }
    keyPressed = async (event) => {
        if (event.key === "Enter") {
            const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
            const response = await fetch(commentsUrl, {
                method: "POST",
                body: JSON.stringify(this.state.newComment),
                headers: new Headers({
                    'Authorization': 'Basic ' + this.props.authoKey,
                    "Content-Type": "application/json",
                }),
            });
            if (response.ok) {
                alert("Comment added");
                this.setState({
                    newComment: {
                        comment: "",
                        rate: "5",
                        elementId: this.props.info._id,
                    },
                });
            } else {
                alert("An error has occurred");
            }
        }
    }


    componentDidMount = async () => {
        const commentsUrl = "https://striveschool.herokuapp.com/api/comments/";
        const comments = await fetch(commentsUrl + this.props.info._id, {
            headers: new Headers({
                'Authorization': 'Basic ' + this.props.authoKey,
            }),
        }).then((response) => response.json());
        this.setState({ comments });
    }


    render() {
        return (
            <div className="postContent box-shadow  mb-2">
                <div className='postHeader d-flex align-items-center p-3'>
                    <div className="imgSmall mr-3" >
                        {this.props.info.user.image ?
                            <Link to={"/profiles/" + this.props.info.user.username}>
                                <Image fluid src={this.props.info.user.image} />
                            </Link>
                            :
                            <Link to={"/profiles/" + this.props.info.user.username}>
                                <Image fluid src='https://img.icons8.com/officel/2x/user.png' />
                            </Link>
                        }
                    </div>
                    <div className="d-flex flex-column">
                        <h6 className="m-0">
                            <Link to={"/profiles/" + this.props.info.user.username}>
                                {this.props.info.user.name + " " + this.props.info.user.surname}
                            </Link>
                        </h6>
                        <label className="m-0">{this.props.info.user.title}</label>
                        <label className="m-0">Time</label>
                    </div>
                    <div className="postOptions">

                        <div onClick={() => this.setState({ showDropdown: !this.state.showDropdown })}>
                            <BsThreeDots />
                        </div>

                    </div>
                    <div className="dropDownMenu">
                        <Dropdown.Menu show={this.state.showDropdown}>
                            <Dropdown.Item onSelect={() => console.log("Edit")}>Edit</Dropdown.Item>
                            <Dropdown.Item onSelect={() => this.deletePost(this.props.info._id)}>Delete</Dropdown.Item>
                            <Dropdown.Item onSelect={() => console.log("Something else")}>Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </div>
                </div>
                <div className="postImage p-3">
                    {this.props.info.text}
                    {this.props.info.image &&
                        <Image src={this.props.info.image} />
                    }
                </div>
                <div className="p-3">
                    <hr></hr>
                    <Accordion defaultActiveKey="">

                        <div className="commentIcons d-flex">
                            {this.state.clicked ?
                                <div onClick={() => this.setState({ clicked: !this.state.clicked })}>
                                    <AiFillLike /> Liked
                            </div>

                                :
                                <div onClick={() => this.setState({ clicked: !this.state.clicked })}>
                                    <AiOutlineLike /> Like
                            </div>
                            }

                            <Accordion.Toggle style={{ color: "black", margin: '0', textDecoration: "none" }} as={Button} variant="link" eventKey="1">
                                <GoComment /> Comment
                            </Accordion.Toggle>

                            <FaShare /> Share
                    </div>

                        <Accordion.Collapse eventKey="1">
                            <div className="d-flex flex-column ml-3" style={{ display: "'" + this.state.showComments + "'" }}>
                                <div className="commentImg d-flex">
                                    {this.props.userImage ?
                                        <Image src={this.props.userImage[0].image} />
                                        :
                                        <Image src='https://img.icons8.com/officel/2x/user.png' />
                                    }
                                    <div className="inputComment">
                                        <input className="comment" onChange={this.addComment}
                                            onKeyPress={this.keyPressed} type="text" placeholder="Write a new comment" />
                                    </div>
                                </div>
                                <div className="mt-3 mr-3">
                                    {this.state.comments && this.props.users &&

                                        // this.props.users.filter(user => user.username === comment.id).map(user => )}

                                        <>
                                            <div>
                                                {this.state.comments.map((comment, i) =>
                                                    <>
                                                        <div key={i} className="commentImg d-flex">
                                                            <div>
                                                                <Image src={this.props.users.find(user => user.username === comment.author).image} />
                                                            </div>
                                                            <div className="inputComment ml-3">
                                                                <h6>
                                                                    {this.props.users.find(user => user.username === comment.author).name + " "}
                                                                    {this.props.users.find(user => user.username === comment.author).surname}
                                                                </h6>
                                                                {comment.comment}
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                                }

                                            </div>
                                        </>
                                    }
                                </div>

                            </div>
                        </Accordion.Collapse>

                    </Accordion>
                </div>
            </div >

        );
    }
}

export default FeedPosts;