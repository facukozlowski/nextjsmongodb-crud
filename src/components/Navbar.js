import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from 'next/link'

export const Navbar = () => {


  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
       <Menu.Item>
          <Link href= "/" >
          <img src="/favico.ico" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
          <Button secondary size="mini" onClick={() => router.push('/tasks/new')}>
            New task
            </Button>
            <Menu.Item>
            <Button primary size="mini" onClick={() => router.push('/users/new')}>
            New User
            </Button>
            </Menu.Item>
            </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
