import React from 'react';
import { Button } from 'react-bootstrap'
import { TiCameraOutline } from 'react-icons/ti'
import { BsCameraVideo, BsPencilSquare } from 'react-icons/bs'
import { FiFileText } from 'react-icons/fi'

function FeedContent(props) {
    return (
        <div className="mb-3 box-shadow ">
            <div className="postContainer d-flex" >
                <div className="mainPostButton ">
                    <Button onClick={() => props.addNewPost()}>
                        <div className="d-flex">
                            <BsPencilSquare />
                            <p style={{ color: 'rgb(100, 100, 100)', marginLeft: '20px' }}>Start a post</p>
                        </div>
                    </Button>
                </div>
                <div className="feedIcons d-flex">
                    <Button>
                        <TiCameraOutline />
                    </Button>
                    <Button>
                        <BsCameraVideo />
                    </Button>
                    <Button>
                        <FiFileText />
                    </Button>

                </div>

            </div>
            <div id="feedContent" className="d-flex justify-content-between">
                <p><span>Write an article</span> on LinkedIn</p>
            </div>
        </div>
    );
}

export default FeedContent;