import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <Navbar bg="primary" className="py-3" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Reviewvly</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
          </Nav>
          <Form className="d-flex me-4">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
          </Form>
          <Button variant="primary">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
