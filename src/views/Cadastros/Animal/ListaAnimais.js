import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardHeader, Col, Row, Table } from 'reactstrap';
import api from '../../../services/api';

function AnimalRow(props){
  debugger;
  const animal = props.animal
  const URLIMAGE = `http://localhost:3000/${animal.photo.thumb.url}`
  const URLCOMUNICAR = `/informar/${animal.id}`

  const getBadge = (status) => {
    return status == 'COMUNICADO' ? 'warning' :
           status == 'PERDIDO' ? 'danger' :
           status == 'ENCONTRADO' ? 'success' :
           'primary'
  }

  return (
    <tr key={animal.id.toString()}>
      <td><img src={URLIMAGE} className="img-avatar" alt="foto animal" /></td>
      <td>{animal.name}</td>
      <td>{animal.age}</td>
      <td>{animal.extra_information}</td>
      <td>{animal.city}/{animal.state}</td>
      <td><Badge color={getBadge(animal.status)}>{animal.status}</Badge></td>
      <td>
        <Link to={URLCOMUNICAR}>
          <Button color="primary" className="btn-sm" block>Informar</Button>
        </Link>
      </td>
    </tr>
  )
}

class ListaAnimais extends Component {
  constructor(props){
    super(props)
    this.retrieveAnimalsList = this.retrieveAnimalsList.bind(this)

    this.state = {
      animals: [],
      error: ""
    }
  }

  componentDidMount(){
    this.retrieveAnimalsList()
  }

  retrieveAnimalsList(){
    api.get('/animals').then(response => {
      this.setState({
        animals: response.data.data
      })
    }).catch(error => {
      this.setState({
        error: "Falha ao buscar os dados dos animais."
      })
    })
  }

  render() {
    const { animals } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                Lista de Animais
              </CardHeader>
            </Card>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">Foto</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Idade</th>
                  <th scope="col">Informações</th>
                  <th scope="col">Cidade/Estado</th>
                  <th scope="col">Situação</th>
                  <th scope="col">Informar</th>
                </tr>
              </thead>
              <tbody>
                {animals && animals.map((animal, index) =>
                  <AnimalRow key={index} animal={animal} />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListaAnimais;
