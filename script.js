const url = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList";

const container = document.getElementById("userContainer");

async function getUsers() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  data.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `<h3 class="user-name">${user.name}</h3><p>Email: <span class="user-email">${user.email}</span></p><p>ID: ${user.id}</p>`;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "DELETE";
    deleteButton.addEventListener("click", async () => {
      const success = await deleteUser(user.id);
      if (success) card.remove();
    });
    card.appendChild(deleteButton);
    const editButton = document.createElement("button");
    editButton.textContent = "EDITAR";
    editButton.setAttribute("type", "button");
    card.appendChild(editButton);
    const form = document.createElement("form");
    form.classList.add("edit-form");
    form.innerHTML = `
      <label>
        Nombre
        <input type="text" name="name" value="${user.name}" required />
      </label>
      <label>
        Email
        <input type="email" name="email" value="${user.email}" required />
      </label>
      <div id="buttonsMiniForm">
        <button type="submit">Guardar</button>
        <button type="button" id="cancelButton">Cancelar</button>
      </div>
    `;
    card.appendChild(form);
    form.style.display = "none";
    editButton.addEventListener("click", () => {
      form.style.display = "block";
    });
    const cancelButton = form.querySelector("#cancelButton");
    cancelButton.addEventListener("click", () => {
      form.reset();
      form.style.display = "none";
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newName = (formData.get("name") || "").trim();
      const newEmail = (formData.get("email") || "").trim();
      if (!newName || !newEmail) {
        alert("Completá nombre y email");
        return;
      }
      const nameEl = card.querySelector(".user-name");
      const emailEl = card.querySelector(".user-email");
      const prevName = nameEl.textContent;
      const prevEmail = emailEl.textContent;
      nameEl.textContent = newName;
      emailEl.textContent = newEmail;
      try {
        const saved = await updateUser(user.id, { name: newName, email: newEmail });
        nameEl.textContent = saved.name;
        emailEl.textContent = saved.email;
        form.style.display = "none";
      } catch (error) {
        nameEl.textContent = prevName;
        emailEl.textContent = prevEmail;
        alert("No se pudo guardar");
        console.error(error);
      }
    });
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
    console.log(`Se eliminó el usuario con el ID ${id}`);
    return true;
  } else {
    console.error("Error al eliminar al usuario");
    return false;
  }
}

async function updateUser(id, partial) {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partial),
  });
  if (!response.ok) throw new Error("No se pudo actualizar");
  const data = await response.json();
  return data;
}