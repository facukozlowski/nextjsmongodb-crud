import { Button, Card, Container, Grid } from "semantic-ui-react";

export default function HomePage({ tasks }) {

  if (tasks.legth === 0) return (
    <Grid centered verticalAlign="middle" columns={1} style={{heigth:"80vh"}}>
      <Grid.Row>
        <Grid.Column  textAlign="center">
          <h1>There are no tasks yet</h1>
          <img src="https://vectorified.com/images/no-data-icon-15.png"/>
          <div>
            <Button primary>
              Create a Task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  // Render a list of tasks
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary>View</Button>
              <Button primary>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
