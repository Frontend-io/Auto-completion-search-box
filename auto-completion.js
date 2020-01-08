let container = document.querySelector(".form");
	let list = container.querySelector(".auto-complete");
	let input = container.querySelector("input")

	const countries = [
		"Nigeria",
		"Kenya",
		"Albania",
		"China",
		"Mexico",
		"Zimbabwe",
		"italy",
		"Egypt",
		"London",
		"Arabia",
		"Nepal",
		"    America", // Test for white space trimming
		"Germany",
		"Span",
		"India",
		"Tunisia",
		"Egypt",
		"Israel",
		"Zambia",
		"Czech Republic",
		"Qatar",
		"Morocco",
		"Somalia",
		"Sudan",
		"Gambia",
		"Gabon",
		"South Africa",
		"Cape Verde",
		"France",
		"Venezuela",
		"Brazil",
		"Pakistan",
		"Bangledesh",
		"Afghanistan",
		"Iran",
		"Iraq",
		"South Korea",
	];

	// Items that matched
	matches = [];

	// Focus input onLoad
	input.focus()

	// Initial cursor position
	var cursorPosition = 0;

	input.addEventListener("keyup", browseMatches);
	function browseMatches(e){
		const {value} = e.target;
		const {keyCode} = e;

		let trimmedValue = value.trim(' ');
		// Reset the list
		list.innerHTML = "";
		toggleContainer("hide");

		// Start searching
		if (trimmedValue.length > 0) {
			// Call the match checker function
			checkForMatches(trimmedValue);
			// Load the matches into the DOM
			showMatches(matches);

			// Control the cursor position for hightlighting result
			switch(keyCode) {
					// Hide the results when Esc key is clicked 
					case 27: toggleContainer("hide")
				break;
					// Allow for infinite scrolling
					case 38: if(cursorPosition !== 0){
								(cursorPosition--)
							}else{
								// Enable infinite scrolling if enabled
								if (container.getAttribute('data-infinite') == "true") {
									(cursorPosition = ( matches.length-1) ); 
								}
							}
				break;
					case 40: if(cursorPosition !== (matches.length -1)){
								(cursorPosition++)
							}else{
								// Enable infinite scrolling if enabled
								if (container.getAttribute('data-infinite') == "true") {
									(cursorPosition = 0); 
								}
							}
				break;
					case 13: 
				break;
			}
		}	

	}
	
	// Hide or show the autocomplete list
	function toggleContainer(state){
		
		// Recalculate max-height to effect animation
		let totalHeight = 0;
		let children = list.children;

		// Delay the loop
		setTimeout(()=>{
			if (children.length) {
				// Set the first result as selected
				children[cursorPosition].classList.add("selected");
				// Makes sure the selected result is in view
				children[cursorPosition].scrollIntoViewIfNeeded()
			}

			// Gather individual heights of each list element
			for (var child = 0; child < children.length; child++) {
				totalHeight += children[child].scrollHeight;

				// Enable click to select option

				children[child].addEventListener("click", selectOption)
			}
		}, 0)

		setTimeout(()=>{
			if(state == "show"){
				list.style.visibility = "visible";
				list.style.height = totalHeight + "px";
			}else if(state == "hide"){
				list.style.visibility = "hidden";
				list.style.height = "0px";
			}
		},8)
	}

	// Compare the search term with the countries in the array and return matches
	function checkForMatches(searchTerm){
		toggleContainer('show');
		// Init the matches back to empty
		matches = [];
		// Start checking for matches
		for (var i = 0; i < countries.length; i++) {
			if(countries[i].toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
				matches.push(countries[i])
			}
		}
		return matches
	}

	// Show matches
	function showMatches(matchList){
		toggleContainer('show');
		if (matchList.length > 0) {
			for (let match of matchList) {
				let firstLetter = match.trim(" ")[0];
				list.innerHTML  += `<li><span>${firstLetter}</span>${match}</li>`;
			}
		}else{
			list.innerHTML = "<div>No match found!</div>"
		}
	}
	// Select option
	function selectOption(){
		// Select the text in th option and hide the form
		input.value = this.innerHTML.split("</span>")[1];
		toggleContainer("hide")
	}
