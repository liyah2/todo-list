function TodoForm() {
  return (
    <form>
      <label htmlFor="todo">Add ToDo Item: </label>
      <input id="todo" type="text" />
      <button diabled type="submit">
        {" "}
        Add{" "}
      </button>
    </form>
  );
}
export default TodoForm;
