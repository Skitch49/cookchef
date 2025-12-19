import RecipeForm from "./component/RecipeForm/RecipeForm";

function Admin() {
  return (
    <div className="d-flex flex-column flex-fill align-items-center p-20">
      <h1>Admin</h1>
      <RecipeForm></RecipeForm>
    </div>
  );
}
export default Admin;
