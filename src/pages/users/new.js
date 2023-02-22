import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const NewUser = () => {
  const [NewUser, setNewUser] = useState({
    name: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getUser = async () => {
    const res = await fetch("http://localhost:3000/api/users/" + query.id);
    const data = await res.json();
    setNewUser({ name: data.name });
  };

  useEffect(() => {
    if (query.id) getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateUser();
    } else {
      await createUser();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewUser({ ...NewUser, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!NewUser.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const createUser = async () => {
    try {
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewUser),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      await fetch("http://localhost:3000/api/users/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewUser),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div className="form-container">
            <h1>{!query.id ? "Create User" : "Update user"}</h1>
            <div>
              {isSubmitting ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    error={
                      errors.name
                        ? { content: "Please enter a name", pointing: "below" }
                        : null
                    }
                    label="Name"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={NewUser.name}
                    autoFocus
                  />
                  <div class="ui buttons" style={{ padding: "1rem" }}>
                    <button class="ui positive button">Save</button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewUser;