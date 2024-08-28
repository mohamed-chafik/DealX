fetch('/Cars.json')
  .then(response => response.json())
  .then(carsData => {

 
  //--------------------------------.



    // Function to create car cards
    function createCarCards(cars) {
      const container = document.querySelector('.cards');
      container.innerHTML = ''; // Clear existing cards




      cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'card';

        // Headers div (background image)
        const headersDiv = document.createElement('div');
        headersDiv.className = 'headers';
        headersDiv.style.backgroundImage = `url(${car.image})`;
        headersDiv.style.backgroundSize = 'cover';
        headersDiv.style.backgroundPosition = 'center';

        // Info div
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        // Car title
        const title = document.createElement('h2');
        title.textContent = `${car.brand} ${car.model}`;
        infoDiv.appendChild(title);

        // Data div
        const dataDiv = document.createElement('div');
        dataDiv.className = 'data';

        // First row of icons (Energy and Seats)
        const firstRow = document.createElement('div');
        const energySpan = createIconSpan('/images/gas.png', car.specs.energy);
        const seatsSpan = createIconSpan('/images/group.png', car.specs.seats);
        firstRow.appendChild(energySpan);
        firstRow.appendChild(seatsSpan);

        // Second row of icons (Speed and Transmission)
        const secondRow = document.createElement('div');
        const speedSpan = createIconSpan('/images/speed.png', car.specs.top_speed);
        const transmissionSpan = createIconSpan('/images/transmission.png', car.specs.transmission);
        secondRow.appendChild(speedSpan);
        secondRow.appendChild(transmissionSpan);

        // Append rows to data div
        dataDiv.appendChild(firstRow);
        dataDiv.appendChild(secondRow);

        // Append all to the card
        infoDiv.appendChild(dataDiv);
        card.appendChild(headersDiv);
        card.appendChild(infoDiv);

        // Append card to the container
        container.appendChild(card);
      });
    }

    // Helper function to create a span with an icon and text
    function createIconSpan(iconSrc, text) {
      const span = document.createElement('span');
      span.className = 'icons';

      const img = document.createElement('img');
      img.src = iconSrc;
      img.alt = '';

      const p = document.createElement('p');
      p.textContent = text;

      span.appendChild(img);
      span.appendChild(p);

      return span;
    }

    // Function to filter cars based on search input
    function filterCars(cars) {
      const searchBar = document.querySelector('.searchInput');
      const searchText = searchBar.value.toLowerCase();

      const filteredCars = cars.filter(car => {
        return (

          car.brand.toLowerCase().includes(searchText) ||
          car.model.toLowerCase().includes(searchText) ||
          car.specs.energy.toLowerCase().includes(searchText) ||
          car.specs.transmission.toLowerCase().includes(searchText) ||
          car.specs.seats.toString().includes(searchText) ||
          car.type.toLowerCase().includes(searchText) ||
          car.specs.top_speed.toString().includes(searchText)
        );
      });

      // Recreate the car cards with the filtered list
      createCarCards(filteredCars);
    }

    // Call the function to create initial cards
    createCarCards(carsData);

    // Add event listener to the search bar for real-time filtering
    const searchBar = document.querySelector('.searchButton');
    searchBar.addEventListener('click', () => filterCars(carsData));

  })
  .catch(error => console.error('Error loading JSON:', error));
