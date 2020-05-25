import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import api from '../../services/api';

function AnimalRow(props){
  const animal = props.animal
  const URLIMAGE = `http://localhost:3000/${animal.photo.thumb.url}`
  const URLEDIT = `/app/animal/edit/${animal.id}`
  const URLCOMUNICADO = `/app/animal/comunicados/${animal.id}`

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
        <Link to={URLCOMUNICADO}>
          <Button color="success" className="btn-sm" block>Comunicados</Button>
        </Link>
      </td>
      <td className="text-right">
        <Link to={URLEDIT}>
          <Button color="primary" className="btn-sm">Visualizar</Button>
        </Link>
      </td>
    </tr>
  )
}

class Dashboard extends Component {
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
    api.get('/animal/list').then(response => {
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
                <Link to="/app/animal/insert">
                  <Button type="button" color="success" className="pull-right">Novo Animal</Button>
                </Link>
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
                  <th scope="col">Comunicados</th>
                  <th scope="col">Ações</th>
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

export default Dashboard;
