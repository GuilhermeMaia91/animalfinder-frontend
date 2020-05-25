import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import api from "../../../services/api";

class AnimalEditar extends Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

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

  handleUpdate = async e => {
    e.preventDefault();
    const { id, name, photo, age, extra_information, city, state, status } = this.state;

    if (!name || !city || !state) {
      this.setState({ error: "Preencha os campos de Nome, Cidade e Estado para continuar!" });
    }
    else {
      try {
        const formData = new FormData();
        formData.append('name', name);

        if (photo[0] !== undefined){
          formData.append('photo', photo[0]);
        }

        formData.append('age', age);
        formData.append('extra_information', extra_information);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('status', status);
        formData.append('id', id);
        formData.append('owner_id', localStorage.getItem('owner_id'));

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const response = await api.put(`/animal/edit`, formData, config);
        if (response.data.status === 200){
          this.setState({ success: "Cadastro atualizado com sucesso!" })
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
            "Houve um problema ao realizar o atualização, verifique se os dados informados estão corretos"
        });
      }
    }
  };

  handleDelete() {
    const { id } = this.state;

    api.delete(`/animal/delete/${id}`).then(response => {
      if (response.data.status === 200){
        this.setState({ success: "Registro Removido com sucesso! "})
        this.props.history.push('/app');
      }
      else{
        this.setState({
          error:
            response.data.data.message
        });
      }
    })
    .catch(e => {
      console.log(e);
    });
  }

  componentDidMount(){
    api.get(`/animal/show/${this.props.match.params.id}`).then(response => {
      if (response.data.status === 200){
        this.setState({
          id: response.data.data.id,
          name: response.data.data.name,
          photo: response.data.data.photo,
          age: response.data.data.age,
          extra_information: response.data.data.extra_information,
          city: response.data.data.city,
          state: response.data.data.state,
          status: response.data.data.status
        });
      }
    }).catch(error => {
      this.state.error = "Falha ao buscar os dados dos animais.";
    })
  }

  render() {
    const { id, name, photo, age, extra_information, city, state, status } = this.state;
    var URLIMG = ''

    if (photo.thumb !== undefined){
      URLIMG = `http://localhost:3000/${photo.thumb.url}`
    }

    return (
      <div className="animated fadeIn align-items-center">
          <Row className="justify-content-center">
            <Col md="12" lg="12" xl="12">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleUpdate}>
                    <h1>Atualizar informações do Animal</h1>
                    <p className="text-muted">Atualizar os dados do animal</p>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    {this.state.success && <p className="text-success">{this.state.success}</p>}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-social-github"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nome" autoComplete="name" onChange={e => this.setState({ name: e.target.value })} value={name} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Col lg="6" className="p-0">
                      <Input type="file" placeholder="Foto" autoComplete="photo" onChange={e => this.setState({ photo: e.target.value })} />
                      </Col>
                      <Col lg="6" className="text-right">
                      <img src={URLIMG} className="img-avatar" alt="foto animal" />
                      </Col>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-hourglass"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" placeholder="Idade" autoComplete="age" onChange={e => this.setState({ age: e.target.value })} value={age} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-info"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Informação Extra" autoComplete="extra_information" onChange={e => this.setState({ extra_information: e.target.value })} value={extra_information} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-location"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Cidade" autoComplete="city" onChange={e => this.setState({ city: e.target.value })} value={city} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-pin"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select" placeholder="Estado" autoComplete="state" onChange={e => this.setState({ state: e.target.value })} value={state}>
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
                      <Input type="select" placeholder="Situação" autoComplete="status" onChange={e => this.setState({ status: e.target.value })} value={status}>
                        <option value="PERDIDO">PERDIDO</option>
                        <option value="COMUNICADO">COMUNICADO</option>
                        <option value="ENCONTRADO">ENCONTRADO</option>
                      </Input>
                    </InputGroup>
                    <Button type="submit" color="success">Salvar</Button>
                    <Button color="danger" onClick={this.handleDelete}>Remover</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default AnimalEditar;
