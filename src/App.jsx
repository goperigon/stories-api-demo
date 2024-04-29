import "./styles.css";
import { Stories } from "./Stories";

export default function App() {
  return (
    <div className="App pt-4 mt-10">
      <h1 className="text-3xl font-bold">Latest Stories about EVs 🚗</h1>
      <Stories />
    </div>
  );
}
