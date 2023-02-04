import { Menu, Container, Button } from "semantic-ui-react";

export const Navbar = () => {
  return (
    <Menu>
      <Container>
        <Menu.Item>
          <img src="/favicom.ico" alt="" />
        </Menu.Item>
        <Menu.Menu>
            <Menu.Item>
          <Button primary size="mini" OnClick={() => alert("works")}>
            New task
            </Button>
            </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
