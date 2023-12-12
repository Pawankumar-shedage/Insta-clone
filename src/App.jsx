import { useFirebase } from "./FirebaseSetUp/FirebaseContext";

function App() {
  const { greet } = useFirebase();

  return (
    <>
      <h1>My Insta clone</h1>
      {greet}
    </>
  );
}

export default App;
