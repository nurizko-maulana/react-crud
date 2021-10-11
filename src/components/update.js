import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Button, Checkbox, Form } from "semantic-ui-react";

const Update = () => {
  const [id, setID] = useState(null);
  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  let history = useHistory();
  const updateAPIData = () => {
    axios
      .put(`https://61601920faa03600179fb8d2.mockapi.io/fakeData/${id}`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        history.push("/read");
      });
    console.log(firstName);
    console.log(lastName);
    console.log(checkbox);
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            onChange={(e) => setCheckbox(!checkbox)}
            checked={checkbox}
          />
        </Form.Field>
        <Button onClick={updateAPIData} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default Update;
