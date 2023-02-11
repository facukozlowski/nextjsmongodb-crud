import { Button, Card, Container, Grid } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { userAgent } from "next/server";

export default function HomePage({ home }) {

  const router = useRouter();

   return (
    <Container style={{padding: "20px"}}>
      <Card.Group itemsPerRow={4}>
        <h1>Welcome</h1>
              <Card.Content position="left">
              <Button primary
              onClick={() => router.push(`/users`)}
              >User
              </Button>
              <Button primary
              onClick={() => router.push(`/tasks`)}
              >Task
              </Button>
            </Card.Content>
            </Card.Group>
    </Container>
)}
