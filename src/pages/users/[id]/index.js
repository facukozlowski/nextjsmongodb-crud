import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Card, Grid, Container } from "semantic-ui-react";
import Error from "next/error";

const User = ({ user, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteUser = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteUser();
    push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} name={error.statusText} />;


    const router = useRouter();
    if (user.tasks.length === 0) return (
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
          user.tasks.map(task => (
            <Card key={task._id}>
              <Card.Content textAlign="center">
                <Card.Header>{task.title}</Card.Header>
                <div style={{ marginTop: "1rem" }}>
                <p>{task.description}</p>
                </div>
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
        <Container style={{padding: "20px"}}>
        <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{user.title}</h1>
          <Card.Content>
          <div>
          <button class="ui inverted red button" onClick={open} loading={isDeleting}>Delete user</button>   
          </div>
          </Card.Content>
        </Grid.Column>
       </Grid.Row>
        </Container>
      </Card.Group>
      {/* Confirm modal */}
      <Confirm
        content={`you sure to delete the user ${user.name}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Container>
  );

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >

      {/* Confirm modal */}
      <Confirm
        content={`you sure to delete the user ${user.name}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);

  if (res.status === 200) {
    const user = await res.json();

    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default User;