import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import api from "../../../services/api";

class Register extends Component {
  state = {
    name: "",
    email: "",
    celphone: "",
    password: "",
    password_confirmation: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { name, email, celfone, password, password_confirmation } = this.state;

    if (!name || !email || !celfone || !password || !password_confirmation) {
      this.setState({ error: "Preencha todos os campos para continuar!" });
    } else {
      try {
        const response = await api.post("/signup", { name, email, celfone, password, password_confirmation });
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema ao realizar o cadastros, verifique se os dados informados estão corretos"
        });
      }
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSignUp}>
                    <h1>Cadastre-se</h1>
                    <p className="text-muted">Crie sua conta de graça!</p>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome Completo" autoComplete="name" onChange={e => this.setState({ name: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" onChange={e => this.setState({ email: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Celular" autoComplete="celfone" onChange={e => this.setState({ celfone: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Digite uma senha" autoComplete="password" onChange={e => this.setState({ password: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Confirme a senha" autoComplete="password_confirmation" onChange={e => this.setState({ password_confirmation: e.target.value })} />
                    </InputGroup>
                    <Button type="submit" color="success" block>Criar conta</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
