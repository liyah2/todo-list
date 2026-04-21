function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle">Add ToDo: </label>
      <input id="todoTitle" type="text" />
      <button disabled type="submit">
        {" "}
        Add{" "}
      </button>
    </form>
  );
}
export default TodoForm;
