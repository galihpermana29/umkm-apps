const container = document.querySelector('.container');

function fetching(name) {
	let xhr = new XMLHttpRequest();
	// console.log(xhr);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
            // console.log(this.response);
            appendToBody(this.response)
			} else if (xhr.status !== 4) {
				console.log('eror brou');
			}
		}
   };
   // console.log(name)
   if(window.location.hash == "" && name === undefined){
      name = 'home';
      // console.log('t')
   }
   
   xhr.open('GET', `./${name}.html`)
   xhr.send();
}

fetching();

const icons = document.querySelectorAll('.icon');
// console.log(icons)
icons.forEach(icon => {
   icon.addEventListener('click', (e) => {
      let name = icon.dataset.name
      // console.log(name)
      fetching(name)
   })
})

function appendToBody (data) {
   container.innerHTML = data;
}