import React, { Component } from 'react';
import { Card, CardHeader, Col, Row, Table } from 'reactstrap';
import api from '../../../services/api';

function ComunicadoRow(props){
  const comunicado = props.comunicado

  return (
    <tr key={comunicado.id.toString()}>
      <td>{comunicado.name}</td>
      <td>{comunicado.phone}</td>
    </tr>
  )
}

class Comunicados extends Component {
  constructor(props){
    super(props)
    this.retrieveComunicadosList = this.retrieveComunicadosList.bind(this)

    this.state = {
      comunicados: [],
      error: ""
    }
  }

  componentDidMount(){
    this.retrieveComunicadosList()
  }

  retrieveComunicadosList(){
    api.get(`animal/comunicated/${this.props.match.params.id}`).then(response => {
      this.setState({
        comunicados: response.data.data
      })
    }).catch(error => {
      this.setState({
        error: "Falha ao buscar os dados dos animais."
      })
    })
  }

  render() {
    const { comunicados } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                Lista de Comunicados
                {this.state.error && <p className="text-danger">{this.state.error}</p>}
              </CardHeader>
            </Card>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {comunicados && comunicados.map((comunicado, index) =>
                  <ComunicadoRow key={index} comunicado={comunicado} />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comunicados;
