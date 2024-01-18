import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={`container mx-auto`}>
      <div className={`flex flex-col p-10 text-center text-xl`}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
