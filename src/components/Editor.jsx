import { useNavigate } from "react-router-dom";

const Editor = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexGrow">
        {/* <Link to="/">Home</Link> */}
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </section>
  );
};

export default Editor;
