document.addEventListener("DOMContentLoaded", function () {
   const list = document.querySelector("#list");
   fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => {
         data.forEach((el) => {
            const li = document.createElement("li");
            li.style.cursor = "pointer";
            li.textContent = el.title;
            li.addEventListener("click", () => {
               const showPanel = document.querySelector("#show-panel");
               showPanel.innerHTML = `<img src=${el.img_url} alt=''/> <h2>${el.title}</h2> <h3>${el?.subtitle}</h3> <h4>${el.author}</h4> <p>${el.description}</p>`;
               el.users.forEach((userList) => {
                  const user = document.createElement("li");
                  user.textContent = userList.username;
                  user.style.cursor = "pointer";
                  showPanel.appendChild(user);
               });
               const like = document.createElement("button");
               like.textContent = "Like";
               like.style.cursor = "pointer";
               showPanel.appendChild(like);
               like.addEventListener("click", () => {
                  fetch(`http://localhost:3000/books/${el.id}`, {
                     method: "PATCH",
                     headers: { "Content-Type": "application/json", Accept: "application/json" },
                     body: JSON.stringify({
                        users: [
                           ...el.users,
                           {
                              username: "pouros",
                              id: 1,
                           },
                        ],
                     }),
                  })
                     .then((res) => res.json())
                     .then((books) => {
                        const userLike = document.createElement("li");
                        const likerName = books.users[books.users.length - 1].username;
                        userLike.textContent = likerName;
                        like.append(userLike);
                        // console.log(userLike);
                        // console.log(books.users[books.users.length - 1]);
                     })
                     .catch((err) => console.error(err.message));
               });
            });
            list.appendChild(li);
         });
      })
      .catch((err) => console.error(err.message));
});