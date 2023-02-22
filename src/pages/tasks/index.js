import { Button, Card, Container, Grid } from "semantic-ui-react";
import {useRouter} from 'next/router'

export default function HomePage({ tasks }) {

  const router = useRouter();
  if (tasks.length === 0) return (
    <Grid centered verticalAlign="middle" columns={1} style={{heigth:"80vh"}}>
      <Grid.Row>
        <Grid.Column  textAlign="center">
          <h1>There are no tasks yet</h1>
          <img src="https://vectorified.com/images/no-data-icon-15.png"/>
          <div>
            <Button primary onClick={() => router.push("/tasks/new")}>
              Create a new Task
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
          tasks.map(task => (
            <Card key={task._id}>
              <Card.Content textAlign="center">
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
                <p>{task.userName}</p>
              </Card.Content>
              <Card.Content extra textAlign="center">
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
              <button class="ui inverted green button" onClick={() => router.push(`/tasks/${task._id}`)}>View</button>
              </div>
              <div class="ui buttons" style={{ padding: "0.5rem" }}>
              <button class="ui inverted secondary button" onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</button>
              </div>
            </Card.Content>
            </Card>
        ))}
      </Card.Group>
    </Container>
  );
}



  export const getServerSideProps = async (ctx) => {
    const res = await fetch('http://localhost:3000/api/tasks');
    const tasks = await res.json();
    return {
      props: {
        tasks,
      },
    };
  }