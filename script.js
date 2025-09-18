const url = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList";

const CONTAINER = document.getElementById("userContainer");

async function getUsers() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  data.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `<p>${user.name}</p> <p>Email: ${user.email}</p> <p>ID: ${user.id}</p>`;
    CONTAINER.appendChild(card);
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
  if (response.ok) console.log(`Se eliminó el usuario con el ID${id}`);
  else {
    console.error("Error al eliminar al usuario");
  }
}
