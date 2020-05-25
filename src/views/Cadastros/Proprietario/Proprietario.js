import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import api from "../../../services/api";

class Proprietario extends Component{
  constructor(props){
    super(props);

    this.state = {
      id: null,
      name: '',
      email: '',
      celfone: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  }

  componentDidMount(){
    api.get('/owner/show').then(response => {
      if (response.data.status === 200){
        this.setState({
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          celfone: response.data.data.celfone
        });
      }
    }).catch(error => {
      this.state.error = "Falha ao buscar os dados dos animais.";
    })
  }

  handleUpdate = async e => {
    e.preventDefault();
    const {id, name, email, celfone, password, password_confirmation } = this.state;

    if (!id || !name || !email || !celfone) {
      this.setState({ error: "Preencha os campos de Nome, Email e Celular para continuar!" });
    }
    else {
      try {
        const response = await api.put("/owner/edit", {id, name, email, celfone, password, password_confirmation });
        if (response.data.status === 200){
          this.setState({ success: "Atualização realizada com sucesso!" })
        }
        else{
          this.setState({
            error:
              response.data.data.message
          });
        }
      } catch (err) {
        this.setState({
          error:
            "Houve um problema ao realizar o cadastros, verifique se os dados informados estão corretos"
        });
      }
    }
  };

  render() {
    const {id, name, email, celfone } = this.state;
    return (
      <div className="animated fadeIn align-items-center">
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleUpdate}>
                    <h1>Atualização Cadastral</h1>
                    <p className="text-muted">Atualização dos dados do Proprietário</p>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    {this.state.success && <p className="text-success">{this.state.success}</p>}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome Completo" autoComplete="name" onChange={e => this.setState({ name: e.target.value })} value={name} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" onChange={e => this.setState({ email: e.target.value })} value={email} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Celular" autoComplete="celfone" onChange={e => this.setState({ celfone: e.target.value })} value={celfone} />
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
                    <Button type="submit" color="success" block>Salvar</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Proprietario;
