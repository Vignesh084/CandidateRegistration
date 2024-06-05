var candidates = [];// Decalre array for the CandidateInfo 

function submitForm() 
{
	if (validateForm()) 
	{
		//Update action
		if (
			document.getElementById("submitbtn").innerHTML.toLocaleLowerCase() ==
			"update"
		) {
			let candidateinfo = readCandidateInfo();
			let candidateindex = candidates.findIndex(
				(candidate) => candidate.Id == candidateId
			);

			candidates[candidateindex].firstName = candidateinfo.firstName;
			candidates[candidateindex].middleName = candidateinfo.middleName;
			candidates[candidateindex].lastName = candidateinfo.lastName;
			candidates[candidateindex].gender = candidateinfo.gender;
			candidates[candidateindex].email = candidateinfo.email;
			candidates[candidateindex].number = candidateinfo.number;
			candidates[candidateindex].jobPosition = candidateinfo.jobPosition;
			candidates[candidateindex].joinedDate = candidateinfo.joinedDate;
			candidates[candidateindex].endDate = candidateinfo.endDate;
			candidates[candidateindex].comments = candidateinfo.comments;
			candidates[candidateindex].filePath = candidateinfo.filePath;
		}
		//Save action
		else 
		{
			 storeCandidateInfo();
		}
		generateGrid();
		clearForm();
		showGrid();
	}
};


function validateForm() {
	var errorCount = 0;
	if (!validateFirstName()) {
		errorCount++;
	}

	if (!validateLastName()) {
		errorCount++;
	}
	if (!validateEmail()) {
		errorCount++;
	}
	if (!validateNumber()) {
		errorCount++;
	}
	if (!validateJoinedDate()) {
		errorCount++;
	}
	if (!validateEndDate()) {
		errorCount++;
	}

	if (!validateJob()) {
		errorCount++;
	}
	if (!validateGender()) {
		errorCount++;
	}
	if (!validateFile()) {
		errorCount++;
	}
	if (!verification()) {
		errorCount++;
	}
	if (errorCount > 0) { //check if errorCount is greater than 0
		return false;
	}
	return true;
}



/**Validate Firstname */
function validateFirstName() 
{
	let message = document.getElementById("firstName");
	let error = document.getElementById("firstNameError");
	if (message.value == "") {
		error.innerHTML = "First name is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};
function validateLastName() {
	let message = document.getElementById("lastName");
	let error = document.getElementById("lastNameError");
	if (message.value == "") {
		error.innerHTML = "Last Name is required";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};
function validateGender() {
	if (
		document.getElementById("male").checked == true ||
		document.getElementById("female").checked == true ||
		document.getElementById("other").checked == true
	) {
		document.getElementById("genderError").innerHTML = "";
		return true;
	} else {
		document.getElementById("genderError").innerHTML =
			"Please select any one option";
		return false;
	}
};
function validateEmail() {
	let message = document.getElementById("e-mail");
	let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (message.value != "") {     // Required Field Validation
		if (message.value.match(emailFormat)) {  // RegEx Validation
			document.getElementById("e-mailError").innerHTML = "";
			return true;
		} else {
			document.getElementById("e-mailError").innerHTML =
				"Enter in correct format";
			return false;
		}
	} else {
		document.getElementById("e-mailError").innerHTML = "Email ID is required";
		return false;
	}
};
function validateNumber() {
	let message = document.getElementById("mobileNumber");
	var regex = "/^[0-9]{10}$/";
    if (message.value != "") {// Required Field Validation
	if (message.value.length == 10 && message.value != regex) { // RegEx Validation    
		document.getElementById("mobileNumberError").innerHTML = "";
		return true;
	} else {
		document.getElementById("mobileNumberError").innerHTML =
			"Enter valid input";
		return false;
	}
}
else{
    document.getElementById("mobileNumberError").innerHTML = "Mobile Number  is required";
		return false;
}
};
function validateFile() {
	let error = document.getElementById("fileError");

	//Required Validation
	if (document.getElementById("upload").value == "") {
		error.innerHTML = "Please select any file";
		return false;
	} else {
		//Extention type validation

		let extn = document.getElementById("upload").value.split(".").pop();
		if (
			extn.toLowerCase() == "jpg" ||
			extn.toLowerCase() == "jpeg" ||
			extn.toLowerCase() == "png" ||
			extn.toLowerCase() == "pdf" ||
			extn.toLowerCase() == "doc" ||
			extn.toLowerCase() == "docx"
		) {
			error.innerHTML = "";
			return true;
		} else {
			error.innerHTML = "Upload a file with Valid format";
			return false;
		}
	}
};
function strToDate(datestr) {
	let dateArray = datestr.split("-");
	return new Date(dateArray[0], dateArray[1], dateArray[2]);
}

//joined date validation
function validateJoinedDate() {
	//Joined date is not filled
	if (document.getElementById("joinedDate").value == "") {
		document.getElementById("joinedDateError").innerHTML =
			"*Joined date is required";
		return false;
	}
	//Joined date both Joined date and End Date is filled
	else if (document.getElementById("endDate").value != "") {
		let joinedDate = strToDate(document.getElementById("joinedDate").value);
		let endDate = strToDate(document.getElementById("endDate").value);

		//Comparison between dates to validate
		if (endDate < joinedDate) {
			document.getElementById("joinedDateError").innerHTML =
				"*Joined date must be less than the End date";
		} else {
			document.getElementById("joinedDateError").innerHTML = "";
			return true;
		}
	}
	// Input is valid
	else {
		document.getElementById("joinedDateError").innerHTML = "";
		return true;
	}
};
function validateEndDate() {
	//End date not filled
	if (document.getElementById("endDate").value == "") {
		document.getElementById("endDateError").innerHTML = "*End date is required";
		return false;
	}
	//Joined date and End date Filled
	else if (document.getElementById("joinedDate").value != "") {
		let joinedDate = strToDate(document.getElementById("joinedDate").value);
		let endDate = strToDate(document.getElementById("endDate").value);

		//Comparison between dates to validate
		if (endDate < joinedDate) {
			document.getElementById("endDateError").innerHTML =
				"*End date must be greater than the Joined date";
		} else {
			document.getElementById("endDateError").innerHTML = "";
			return true;
		}
	}
	//Input is Valid
	else {
		document.getElementById("endDateError").innerHTML = "";
		return true;
	}
};
function verification() {
	let error = document.getElementById("verificationError");
	if (document.getElementById("verification").checked) { //Required Validation
		error.innerHTML = "";
		return true;
	} else {
		error.innerHTML = "Please select ";
		return false;
	}
};
function validateJob() {
	let error = document.getElementById("jobError");
	if (document.getElementById("jobPosition").value == "select") {
		error.innerHTML = "Please select any option";
		return false;
	} else {
		error.innerHTML = "";
		return true;
	}
};

/** getting values form and store in json format  */
function readCandidateInfo() 
{
	let firstName = document.getElementById("firstName").value;
	let middleName = document.getElementById("middleName").value;
	let lastName = document.getElementById("lastName").value;

	let email = document.getElementById("e-mail").value;
	let number = document.getElementById("mobileNumber").value;
	let jobPosition = document.getElementById("jobPosition").value;
	let joinedDate = document.getElementById("joinedDate").value;
	let endDate = document.getElementById("endDate").value;
	let gender = "";
	let comments = document.getElementById("comments").value;
	let filepath = document.getElementById("upload").value;

	let genderElements = document.getElementsByName("gender");

	//Iterating through the checkboxes to find which one is checked
	for (var i = 0; i < genderElements.length; i++) 
	{
		if (genderElements[i].checked) {
			gender = genderElements[i].nextElementSibling.innerText;
		}
	}
    
	// Structure the JSON data
	var candidateInfo = {
		Id: candidates.length + 1,
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		gender: gender,
		email: email,
		number: number,
		jobPosition: jobPosition,
		joinedDate: joinedDate,
		endDate: endDate,
		comments: comments,
		filePath: filepath,
	};

	return candidateInfo;
};

function storeCandidateInfo() 
{
	candidates.push(readCandidateInfo());
};


//Form the Table structure based on the Json data
function generateGrid() {

    //Clear the table body before forming the table structure
    document.getElementById("tableBody").innerText = "";

    for (var i = 0; i < candidates.length; i++) {
        // Create the dynamic tr,td and append every td in tr and tr in tbody
        let trow = document.createElement("tr");
        trow.className = "color";
        let id = document.createElement("td");
        id.className = "table";
        let firstName = document.createElement("td");
        firstName.className = "table";
        let gender = document.createElement("td");
        gender.className = "table";
        let emailAddress = document.createElement("td");
        emailAddress.className = "table";
        let number = document.createElement("td");
        number.className = "table";
        let jobPosition = document.createElement("td");
        jobPosition.className = "table";
        let joinedDate = document.createElement("td");
        joinedDate.className = "table";
        let endDate = document.createElement("td");
        endDate.className = "table";
        let edit = document.createElement("td")
        edit.className = "table";
        let deleteData = document.createElement("td")
        edit.className = "table";
		edit.innerHTML = `<a onclick='editForm(this)'>Edit</a>`;//trigger edit 
		deleteData.innerHTML = "<a onclick='deleteCandidate(this)'>Delete</a>"; // trigger delete


        // append the values in each resp. field in resp. cell
        id.innerHTML = `<a  onclick='viewForm(this)'>${candidates[i].Id}</a>`;
        firstName.innerHTML = candidates[i].firstName;
        gender.innerHTML = candidates[i].gender;
        emailAddress.innerHTML = candidates[i].email;
        number.innerHTML = candidates[i].number;
        jobPosition.innerHTML = candidates[i].jobPosition;
        joinedDate.innerHTML = candidates[i].joinedDate;
        endDate.innerHTML = candidates[i].endDate;
        edit.innerHTML = "<a  onclick='editForm(this)'>Edit</a>";
        deleteData.innerHTML = "<a  onclick='deleteCandidate(this)'>Delete</a>";


        trow.appendChild(id);
        trow.appendChild(firstName);
        trow.appendChild(gender);
        trow.appendChild(emailAddress);
        trow.appendChild(number);
        trow.appendChild(jobPosition);
        trow.appendChild(joinedDate);
        trow.appendChild(endDate);
        trow.appendChild(edit);
        trow.appendChild(deleteData);

        //appending a table row in table body
        document.getElementById("tableBody").appendChild(trow);
    }

};

/**Add candidate  */

function addCandidate() {
	clearForm(); // to clear the form
	document.getElementById("submitbtn").innerHTML = "Submit";
	showForm(); // to show the form to user

}

/**Hide and show process */
function showForm() {
    document.getElementById("formToGrid").style.display = "block";
    document.getElementById("gridToForm").style.display = "none";
};
function showGrid() {
    document.getElementById("formToGrid").style.display = "none";
    document.getElementById("gridToForm").style.display = "block";
};


function clearForm() {
	document.getElementById("firstName").value = "";
	document.getElementById("middleName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("male").checked = false;
	document.getElementById("female").checked = false;
	document.getElementById("other").checked = false;
	document.getElementById("e-mail").value = "";
	document.getElementById("mobileNumber").value = "";
	document.getElementById("upload").value = "";
	document.getElementById("jobPosition").value = "select";
	document.getElementById("joinedDate").value = "";
	document.getElementById("endDate").value = "";
	document.getElementById("comments").value = "";
	document.getElementById("verification").checked = false;

	//clearing error messages
	document.getElementById("firstNameError").innerHTML = "";
	document.getElementById("lastNameError").innerHTML = "";
	document.getElementById("genderError").innerHTML = "";
	document.getElementById("e-mailError").innerHTML = "";
	document.getElementById("mobileNumberError").innerHTML = "";
	document.getElementById("jobError").innerHTML = "";
	document.getElementById("fileError").innerHTML = "";
	document.getElementById("joinedDateError").innerHTML = "";
	document.getElementById("endDateError").innerHTML = "";
	document.getElementById("verificationError").innerHTML = "";
};


/* Delete */

function deleteCandidate(candidateobj) 
{
    var deleterow = candidateobj.closest("tr");//Finding the CandidateId
    let delcandidateId = parseInt(deleterow.cells[0].innerText);
    if (confirm("Are you sure you want to delete this Candidate?")) {
        let candidateindex = candidates.findIndex(candidate => candidate.Id == delcandidateId);
        candidates.splice(candidateindex, 1);// Removing the reord
        candidates.forEach((candidate, index) => {
            candidate.Id = index + 1;//Displaying the rest of the Record
        });
    }
    generateGrid();//Forming the Grid
};

/**Edit  */

function editForm(obj) {
	var edit = obj.closest("tr");
	candidateId = parseInt(edit.cells[0].innerText);
	let candidate = findCandidate(candidateId);
	prefillForm(candidate);
	document.getElementById("submitbtn").innerHTML = "Update";
	showForm(); //form is displayed
};
function findCandidate(candidateId) {
	return candidates.find((candidate) => candidate.Id == candidateId);
};

function prefillForm(candidateInfo) {
	document.getElementById("firstName").value = candidateInfo.firstName;
	document.getElementById("middleName").value = candidateInfo.middleName;
	document.getElementById("lastName").value = candidateInfo.lastName;

	switch (candidateInfo.gender.toLowerCase()) {
		case "male":
			document.getElementById("male").checked = true;
			break;
		case "female":
			document.getElementById("female").checked = true;
			break;
		case "other":
			document.getElementById("other").checked = true;
			break;
	}

	document.getElementById("e-mail").value = candidateInfo.email;
	document.getElementById("mobileNumber").value = candidateInfo.number;
	document.getElementById("jobPosition").value = candidateInfo.jobPosition;
	document.getElementById("joinedDate").value = candidateInfo.joinedDate;
	document.getElementById("endDate").value = candidateInfo.endDate;
	document.getElementById("comments").value = candidateInfo.comments;
}

