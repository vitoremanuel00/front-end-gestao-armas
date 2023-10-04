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
// import ModelosdeArmasChart from "../components/Dashboard";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import './Dashboards.css';

// export default function Dashboards() {
//   return (
//     <Container fluid>
//       <Row>
//         <Col xs={12} md={6}>
//           <Card>
//             {/* Título ou cabeçalho da seção */}
//             <Card.Header>
//               <h4>Modelos de Armas</h4>
//             </Card.Header>
//             <Card.Body>
//               <ModelosdeArmasChart />
//             </Card.Body>
//           </Card>
//         </Col>
//         {/* Outras seções ou colunas podem ser adicionadas aqui */}
//       </Row>
//     </Container>
//   );
// }
import ModelosdeArmasChart from "../components/Dashboard";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//import "./Dashboards.css"; // Importe seu arquivo CSS para estilos personalizados

export default function Dashboards() {
    const navigate = useNavigate();
    return (
        <Container className="dashboard-container">
            <Row className="w-100 m-auto mb-5 mt-5 ">
                <Col >
                    <div className="d-flex justify-content-end mb-3 align-items-center"> {/* Adiciona a classe align-items-center */}
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                navigate("/home");
                            }}
                            className="custom-button" // Adicione uma classe personalizada
                        >
                            Voltar para Página Inicial
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <ModelosdeArmasChart></ModelosdeArmasChart>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}





// <BatalhoesCRChart className="p-4 bg-danger col-12"></BatalhoesCRChart>
