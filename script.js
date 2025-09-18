const url = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList";

const container = document.getElementById("userContainer");

async function getUsers() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  data.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `<h3>${user.name}</h3> <p>Email: ${user.email}</p> <p>ID: ${user.id}</p>`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", async () => {
      const success = await deleteUser(user.id);
      if (success) card.remove();
    });
    card.appendChild(deleteButton);
    container.appendChild(card);
  });
}
getUsers();

async function deleteUser(id) {
  const response = await fetch(
    `https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    console.log(`Se eliminó el usuario con el ID${id}`);
    return true;
  } else {
    console.error("Error al eliminar al usuario");
    return false;
  }
}
