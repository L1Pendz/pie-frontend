import { useContext, useState } from "react";
import { PieContext } from "../context/PieContext";
import { Form, Input } from "./styles";
import { createPie } from "../api/pieService";

export const PieForm: React.FC = () => {
  const context = useContext(PieContext);
  if (!context) throw new Error("PieForm must be used wihtin PieProvide");
  const { dispatch } = context;

  const [name, setName] = useState("");
  const [crust, setCrust] = useState("");

  const [filling, setFilling] = useState("");

  const resetForm = () => {
    setName("");
    setCrust("");
    setFilling("");
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      //validate
      const newPie = await createPie({
        name,
        crust_type: crust,
        filling,
        is_baked: true,
        slice_count: 8,
      });
      dispatch({ type: "ADD_PIE", payload: newPie });
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to bake pie");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Bake a New Pie</h3>
      <Input
        placeholder="Pie Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Pie Crust"
        value={crust}
        onChange={(e) => setCrust(e.target.value)}
        required
      />
      <Input
        placeholder="Pie Filling"
        value={filling}
        onChange={(e) => setFilling(e.target.value)}
        required
      />
    </Form>
  );
};
