import React, { useContext } from "react";
import { Button, Input } from "@nextui-org/react";
import { AuthContext } from "../context/authProvider";
export default function Login() {
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const { handleLogin } = useContext(AuthContext);

  const logIn = async () => {
    handleLogin(email, password);
  };
  return (
    <div>
      <h1>Login</h1>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onPress={logIn}>Login</Button>
    </div>
  );
}
