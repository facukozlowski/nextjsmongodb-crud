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
          <img src="/logo" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item>
            <button class="ui inverted button" onClick={() => router.push('/tasks/new')}>New task</button>
            <Menu.Item>
            <button class="ui inverted button" onClick={() => router.push('/users/new')}>New user</button>
            </Menu.Item>
            </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
