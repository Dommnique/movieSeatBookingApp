const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

//Save movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update seat and total cost count
function updateSelectedCount() {
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    const selectedSeatCount = selectedSeat.length;

    const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeat', JSON.stringify(seatIndex));

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

// Get data from localStorage and populate the UI
function populateUI() {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat'));
    
    if (selectedSeat !== null && selectedSeat.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeat.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//Added event listener to the movieSelect
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

//Added event listener to the container 
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }

    updateSelectedCount();
})

window.addEventListener('pageLoad', updateSelectedCount());