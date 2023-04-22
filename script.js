document.addEventListener("DOMContentLoaded", function() {
    // Código que hace una solicitud GET a la API de GitHub y crea la lista de repositorios
    const username = 'Barahona1602';
    const numberOfRepos = 8;
    const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;

    const repoList = document.getElementById('repos');

    // Función que crea un nuevo elemento de lista para un repositorio dado
    function createRepoListItem(repo) {
      const listItem = document.createElement('li');
      const repoLink = document.createElement('a');
      const repoName = document.createTextNode(repo.name);
      repoLink.appendChild(repoName);
      repoLink.href = repo.html_url;
      listItem.appendChild(repoLink);
      return listItem;
    }

    // hace una solicitud GET a la API de GitHub utilizando fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // filtra los repositorios para solo mantener los públicos
        const publicRepos = data.filter(repo => !repo.private);

        // crea un nuevo elemento de lista para cada uno de los n repositorios más actualizados
        for (let i = 0; i < numberOfRepos; i++) {
          const repo = publicRepos[i];

          // crea una card para cada repositorio
          const card = document.createElement('div');
          card.classList.add('card');

          // crea una imagen para cada repositorio
          const img = document.createElement('img');
          img.src = 'hola.png'; // modifica la URL de la imagen según tus necesidades
          img.alt = `Imagen de ${repo.name}`;

          // crea un título para cada repositorio
          const title = document.createElement('h3');
          title.textContent = repo.name;

          // crea un botón con el enlace a cada repositorio
          const button = document.createElement('a');
          button.classList.add('button');
          button.textContent = 'Ver en GitHub';
          button.href = repo.html_url;

          // agrega la imagen, el título y el botón a la card
          card.appendChild(img);
          card.appendChild(title);
          card.appendChild(button);

          // agrega la card a la lista de repositorios
          const listItem = document.createElement('li');
          listItem.appendChild(card);
          repoList.appendChild(listItem);
          
        }
      })
      .catch(error => console.error(error));
  });