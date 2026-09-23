import { useContext, useEffect } from "react";
import { fetchPies } from "../api/pieService";
import { Card, Grid } from "./styles";
import { PieContext } from "../context/PieContext";

export const PieList: React.FC = () => {
  const context = useContext(PieContext);
  if (!context) throw new Error("PieList must be used within a PieProvider.");
  const { state, dispatch } = context;

  useEffect(() => {
    const loadPies = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await fetchPies();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
      }
    };
    loadPies();
  }, [dispatch]);

  if (state.loading) return <p>Loading pies...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  return (
    <Grid>
      {state.pies.map((pie) => (
        <Card key={pie.id}>
          <h4>{pie.name}</h4>
          <p>
            <strong>Crust:</strong> {pie.crust_type}
          </p>
          <p>
            <strong>Filling:</strong> {pie.filling}
          </p>
          <p>
            {pie.is_baked ? "🔥 Baked" : "🥣 Raw"} • {pie.slice_count} slices
          </p>
        </Card>
      ))}
    </Grid>
  );
};
