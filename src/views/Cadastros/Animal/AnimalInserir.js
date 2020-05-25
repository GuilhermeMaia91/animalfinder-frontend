import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import api from "../../../services/api";

class AnimalInserir extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      photo: '',
      age: '',
      extra_information: '',
      city: '',
      state: '',
      status: '',
      error: ''
    }
  }

  handleInsert = async e => {
    e.preventDefault();
    const { name, photo, age, extra_information, city, state, status } = this.state;

    if (!name || !photo || !city || !state) {
      this.setState({ error: "Preencha os campos de Nome, Foto, Cidade e Estado para continuar!" });
    }
    else {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('photo', photo[0]);
        formData.append('age', age);
        formData.append('extra_information', extra_information);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('status', status);
        formData.append('owner_id', localStorage.getItem('owner_id'));

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const response = await api.post("/animal/insert", formData, config);
        if (response.data.status === 200){
          this.setState({ success: "Cadastro realizado com sucesso!" })
          this.props.history.push("/app");
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
            <Col md="12" lg="12" xl="12">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleInsert}>
                    <h1>Inserir Novo Animal</h1>
                    <p className="text-muted">Cadastrar um novo animal</p>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    {this.state.success && <p className="text-success">{this.state.success}</p>}
                    <InputGroup className="mb-3">
                      <Input type="file" autoComplete="photo" onChange={e => this.setState({ photo: e.target.files })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-social-github"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome" autoComplete="name" onChange={e => this.setState({ name: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-hourglass"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" placeholder="Idade" autoComplete="age" onChange={e => this.setState({ age: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-info"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Informação Extra" autoComplete="extra_information" onChange={e => this.setState({ extra_information: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-location-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Cidade" autoComplete="city" onChange={e => this.setState({ city: e.target.value })} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" placeholder="Estado" autoComplete="state" onChange={e => this.setState({ state: e.target.value })}>
                        <option value=""></option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-equalizer"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" placeholder="Situação" autoComplete="status" onChange={e => this.setState({ status: e.target.value })}>
                        <option value=""></option>
                        <option value="PERDIDO">PERDIDO</option>
                        <option value="COMUNICADO">COMUNICADO</option>
                        <option value="ENCONTRADO">ENCONTRADO</option>
                      </Input>
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

export default AnimalInserir;
