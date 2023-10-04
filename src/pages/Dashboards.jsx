/*import ModelosdeArmasChart  from "../components/Dashboard";
import { Card } from "react-bootstrap";



export default function Dashboards(){
    return(
        <Card>
        <ModelosdeArmasChart></ModelosdeArmasChart>
        </Card>
    )
}
*/
import ModelosdeArmasChart from "../components/Dashboard";
import { Container, Row, Col, Card } from "react-bootstrap";
import './styles.css';

export default function Dashboards() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            {/* Título ou cabeçalho da seção */}
            <Card.Header>
              <h4>Modelos de Armas</h4>
            </Card.Header>
            <Card.Body>
              <ModelosdeArmasChart />
            </Card.Body>
          </Card>
        </Col>
        {/* Outras seções ou colunas podem ser adicionadas aqui */}
      </Row>
    </Container>
  );
}


// <BatalhoesCRChart className="p-4 bg-danger col-12"></BatalhoesCRChart>
