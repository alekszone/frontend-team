import React, { Component } from 'react';
import { Container, FormControl, Button, FormGroup, Image } from 'react-bootstrap'

class Login extends Component {

    state = {
        name: '',
        password: '',
        users: []
    }

    setName = (e) => {
        this.setState({
            name: e
        });
    }

    setPassword = (e) => {
        this.setState({
            password: e
        });
    }


    fetchUser = async () => {
        await fetch("https://striveschool.herokuapp.com/api/profile/", {
            headers: new Headers({
                'Authorization': 'Basic ' + "dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=",
                "Content-Type": "application/json",
            }),
        })
            .then(resp => resp.json())
            .then(respObj => this.setState({
                users: respObj
            }))
    }

    componentDidMount = () => {
        localStorage.removeItem("authorizationKey")
        localStorage.removeItem("username")
        this.fetchUser()
        this.props.resetAuthorization()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let user = this.state.users.filter(user =>
            user.name.toLowerCase() === this.state.name.toLowerCase() && user._id === this.state.password
        )
        if (user.length > 0 && user[0].name.toLowerCase() === "segun") {
            this.props.getAuthorization("dXNlcjI0OjQ4RDR2YVZoNlJhM0REOHc=", "user24")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "klevin") {
            this.props.getAuthorization("dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=", "user16")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "nomfundo verah") {
            this.props.getAuthorization("dXNlcjIxOjJydXhhNE1SSmRVZ2c2Y3o=", "user21")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        } else if (user.length > 0 && user[0].name.toLowerCase() === "oluwasijibomi hafeez") {
            this.props.getAuthorization("dXNlcjE0Oko4M3M4SnN2eWRSTk5qTHQ=", "user14")
            this.props.history.push("/profiles/" + user[0].username)
            this.props.showApp()
        }
        else {
            alert("Plase user just watch out what you type!")
        }


    }

    render() {
        return (
            <Container id="logingPage" className="d-flex justify-content-center ">

                <div className="Login">
                    <Image className="mb-3" src="https://cdn.worldvectorlogo.com/logos/linkedin.svg" />
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="name" bsSize="large">
                            <label>Email</label>
                            <FormControl
                                autoFocus
                                type="name"
                                value={this.state.name}
                                onChange={e => this.setName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <label>Password</label>
                            <FormControl
                                value={this.state.password}
                                onChange={e => this.setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                        <Button block bsSize="large" type="submit">
                            Login
                            </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Login;