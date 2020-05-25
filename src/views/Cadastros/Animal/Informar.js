import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import api from "../../../services/api";

class Informar extends Component{
  constructor(props){
    super(props);

    this.state = {
      animal_id: this.props.match.params.id,
      name: '',
      phone: '',
      error: ''
    }
  }

  handleInsert = async e => {
    e.preventDefault();
    const { animal_id, name, phone } = this.state;

    if (!name || !phone) {
      this.setState({ error: "Preencha os campos de Nome e Telefone para continuar!" });
    }
    else {
      try {
        debugger;
        const response = await api.post("/found", { animal_id, name, phone });
        if (response.data.status === 200){
          this.setState({ success: "O dono do animal será informado do seu contato!" })
          this.props.history.push("/list-animals");
        }
        else{
          this.setState({
            error:
              response.data.data.message
          });
        }
      } catch (err) {
        console.log(err);
        this.setState({
          error:
            "Houve um problema ao realizar o cadastros, verifique se os dados informados estão corretos"
        });
      }
    }
  };

  render() {
    return (
      <div className="animated fadeIn align-items-center">
          <Row className="justify-content-center">
            <Col xs="12" md="10" lg="6" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleInsert}>
                    <h1>Animal Encontrado</h1>
                    <p className="text-muted">Informar que localizou um animal</p>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome" autoComplete="name" onChange={e => this.setState({ name: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Telefone" autoComplete="phone" onChange={e => this.setState({ phone: e.target.value })} />
                    </InputGroup>
                    <Button type="submit" color="success" block>Informar</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Informar;
