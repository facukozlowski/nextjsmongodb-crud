import { Button, Card, Container, Grid } from "semantic-ui-react";
import {useRouter} from 'next/router'

export default function HomePage({ users }) {

  const router = useRouter();

  if (users.legth === 0) return (
    <Grid centered verticalAlign="middle" columns={1} style={{heigth:"80vh"}}>
      <Grid.Row>
        <Grid.Column  textAlign="center">
          <h1>There are no tasks yet</h1>
          <div>
            <Button primary>
              Create a new user
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

//Render a list of task
  return (
    <Container style={{padding: "20px"}}>
      <Card.Group itemsPerRow={4}>
        {
          users.map(user => (
            <Card key={user._id}>
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
              </Card.Content>
              <Card.Content extra>
              <Button primary
              onClick={() => router.push(`/users/${user._id}`)}
              >View
              </Button>
              <Button primary
              onClick={() => {
                const URL = `/users/${user._id}/edit`;
                router.push(URL)}
            }
              >Edit
              </Button>
            </Card.Content>
            </Card>
        ))}
      </Card.Group>
    </Container>
  );
}



  export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/users');
    const users = await res.json();

    return {
      props: {
        users,
      },
    };
  }