import React from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { FaAngleDown } from 'react-icons/fa'

function RightSideFeed() {
    return (
        <div >
            <Card className="text-center box-shadow " style={{ width: '100%', height: '35rem' }}>
                <Card.Header className="d-flex justify-content-center">Add to your feed</Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                    <Card.Title>Get the latest jobs and industry news!</Card.Title>
                    <Card.Img src="https://cdn.pixabay.com/photo/2020/07/24/10/31/10-31-39-74_960_720.jpg" style={{ width: '12rem', height: '12rem' }}></Card.Img>
                    <Card.Text>
                        Explore New Opportunities With StriveSchool!
                    </Card.Text>
                    <Button href="https://www.linkedin.com/school/strive-school/" variant="outline-primary">Follow</Button>
                </Card.Body>
            </Card>
            <hr></hr>
            <div style={{ fontSize: '12px' }}>
                <div className="d-flex justify-content-around">
                    <p>About</p>
                    <p>Accessibility</p>
                    <p>Help Center</p>
                </div>
                <div className="d-flex justify-content-around">
                    <p>Privacy & Terms <FaAngleDown /></p>
                    <p>Ad Choices</p>
                    <p>Advertising</p>
                </div>
                <div className="d-flex justify-content-around">
                    <p>Business Services <FaAngleDown /></p>
                    <p>Get the LinkedIn app</p>
                </div>
                <div className="d-flex justify-content-center">
                    <p>More</p>
                </div>
                <div className="d-flex justify-content-center">
                    <Image src="/assets/linkedin-logo.png" style={{ width: '6rem', height: '1.5rem' }} />
                    <span>LinkedIn Corporation &#169;2020</span>
                </div>
            </div>
        </div>
    )
}

export default RightSideFeed
