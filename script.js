document.addEventListener('DOMContentLoaded', () => {
  // Event delegation for card clicks
  document.addEventListener('click', (event) => {
      // Find the closest card element from the clicked element
      const card = event.target.closest('.card');

      if (card) {
          // Find the h2 element inside the clicked card
          const h2Element = card.querySelector('.info h2');

          if (h2Element) {
              // Store the text content of h2 in local storage
              localStorage.setItem('selectedCar', h2Element.textContent);

              // Redirect to the new page
              window.location.href = 'Checkpage.html';
          } else {
              console.log('No h2 element found inside the card.');
          }
      }
  });
});


   


fetch('/Cars.json')
  .then(response => response.json())
  .then(carsData => {
   var mod =  localStorage.getItem('selectedCar')
function getCarInfo(cars, model) {
    const car = cars.find(car => `${car.brand} ${car.model}` === model);
    if (car) {
      return {
        brand: car.brand,
        year: car.year,
        topSpeed: car.specs.top_speed,
        price: car.specs.price,
        engine: car.specs.engine,
        images: car.specs.images,
        transmission: car.specs.transmission,
        range: car.specs.range,
        hp: car.specs.horsepower,
        weight: car.specs.weight,
        fuel: car.specs.energy
      };
    } else {
      return null; // or handle the case where the car is not found
    }
  }

 


  
  // Retrieve the car information based on the model stored in localStorage
  if (mod) {
    const carInfo = getCarInfo(carsData, mod);
    if (carInfo) {
      let i = 0;
      let s = carInfo.images.length;
      function changeImage(index) {
        const middleElement = document.querySelector(".middle");
  
        // Trigger fade-out effect
        middleElement.classList.add('fade-out');
  
        // Wait for the fade-out transition to complete before changing the image
        setTimeout(() => {
          middleElement.style.backgroundImage = `url(${carInfo.images[index]})`;
          middleElement.classList.remove('fade-out');
          middleElement.classList.add('fade-in');
  
          // Remove the fade-in class after the animation completes
          setTimeout(() => {
            middleElement.classList.remove('fade-in');
          }, 500); // Match the duration of the fade-in animation
        }, 500); 
        // Match the duration of the fade-out animation
      }
      
      document.getElementById('value_price').innerHTML = carInfo.price;
      document.getElementById('value_engine').innerHTML = carInfo.engine;
      document.getElementById("value_year").innerHTML = carInfo.year;
      document.getElementById("value_gear").innerHTML = carInfo.transmission;
      document.getElementById("value_range").innerHTML = carInfo.range;
      document.getElementById("value_hp").innerHTML = carInfo.hp;
      document.getElementById("value_weight").innerHTML = carInfo.weight;
      document.getElementById("value_fuel").innerHTML = carInfo.fuel;
      document.querySelector(".middle").style.backgroundImage = `url(${carInfo.images[0]})`;
      document.querySelector('.left').addEventListener('click', () => {
        i = (i + 1) % s; // Increment the index and wrap around using modulo
        changeImage(i);      });
      document.querySelector('.right').addEventListener('click', () => {
        i = (i - 1 + s) % s; // Increment the index and wrap around using modulo
        changeImage(i);
            });



    } else {
      console.log('Car not found in the JSON data.');
    }
  } else {
    console.log('No model found in localStorage.');
  }
 

  })
  .catch(error => console.error('Error loading JSON:', error));
