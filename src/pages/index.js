import { Button, Card, Container, Grid } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { userAgent } from "next/server";

export default function HomePage({ home }) {

  const router = useRouter();

   return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
        <h1>Welcome!</h1>
              <Grid.Column>
              <Card.Content position="left">
              <div class="ui buttons" style={{ padding: "1rem" }}>
              <button class="ui secondary button" onClick={() => router.push(`/tasks`)}>Tasks</button>
              </div>
              <div class="ui buttons" style={{ padding: "2rem" }}>
              <button class="ui secondary button" onClick={() => router.push(`/users`)}>Users</button>
              </div>
            </Card.Content>
            </Grid.Column>
            </Grid.Column>
      </Grid.Row>
    </Grid>
)}
