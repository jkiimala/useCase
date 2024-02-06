// GALLUP - "ÄÄNESTYS"
function vote(radioGroupName, optionIdYes, optionIdNo, button) {
  let selectedOption = button.closest('.col').querySelector('input[name=' + radioGroupName + ']:checked');
  let container = button.closest('.col');
  
  if (selectedOption) {
    updatePercentage(selectedOption, optionIdYes, optionIdNo);
    let thankYouMessage = createMessage('KIITOS!', 'alert-success'); // ONNISTUNUT ÄÄNESTYS
    container.appendChild(thankYouMessage);
    selectedOption.disabled = true;
    button.removeEventListener('click', vote);
    button.classList.add('disabled');
    scheduleMessageRemoval(thankYouMessage);
    
    checkAllQuestionsAnswered();
  } else {
    let errorMessage = createMessage('TEE VALINTASI!', 'alert-danger'); // ILMOITUS JOS EI OLE TEHTY VALINTAA
    container.appendChild(errorMessage);
    scheduleMessageRemoval(errorMessage);
  }
}

// LOPPUILMOITUS
function showCompletionMessage() {
  const completionMessage = createMessage('Voit nyt sulkea selaimen tai hakea uudet gallupit.', 'custom-alert-success');
  document.body.appendChild(completionMessage);
  // Piilota viesti 5 sekunnin kuluttua
  setTimeout(function() {
    completionMessage.style.display = 'none';
  }, 3000); 
}

// Tarkistus onko kaikkiin kysymyksiin vastattu l. vastausnapit disabled tilassa - näyttää loppuviestin
function checkAllQuestionsAnswered() {
  const buttons = document.querySelectorAll('[id^="vastaaButton"]');
  const allDisabled = [...buttons].every(button => button.classList.contains('disabled'));

  if (allDisabled) {
    showCompletionMessage();
    haeUudetButton.style.display = 'block';
  }
}


function createMessage(text, className) {
  let message = document.createElement('div');
  message.classList.add('alert', className);
  message.textContent = text;
  return message;
}

function scheduleMessageRemoval(message) {
  // Aikakatkaisu ilmoitukselle
  setTimeout(function () {
      message.remove();
  }, 1000);
}


// PÄIVITETÄÄN GALLUPIN TILANNE - PROGRESS BAR
function updatePercentage(selectedOption, optionIdYes, optionIdNo) {
  let progressElement = selectedOption.closest('.col').querySelector('.progress-bar');
  let currentPercentage = parseInt(progressElement.style.width, 10) || 0;

  if (selectedOption.id.includes(optionIdYes)) {
    currentPercentage = Math.min(100, currentPercentage + 1);
  } else if (selectedOption.id.includes(optionIdNo)) {
    currentPercentage = Math.max(0, currentPercentage - 1);
  }

  progressElement.style.width = currentPercentage + '%';
  progressElement.textContent = currentPercentage + '% - ' + (selectedOption.id.includes(optionIdYes) ? 'Joo' : 'Joo');
}



// ADMIN LOGIN
let isAdminLoggedIn = false;

function adminLogin() {
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  const loginError = document.getElementById('loginError');

  // KÄYTTÄJÄNIMEN JA SALASANAN TARKISTUS - JOS OIKEIN SIIRTYY ADMIN OSIOON, MUUTEN VIRHEILMOITUS
  if (username === 'admin' && password === 'admin') {
    location.href = "polliisi.html";
  } else {
    loginError.textContent = 'Tarkista käyttäjänimi ja salasana.';
    loginError.style.display = 'block';

    // AIKAKATKAISU ILMOITUKSELLE
    setTimeout(function () {
      loginError.style.display = 'none';
    }, 2000);
  }
}


// ADMIN LOGOUT
window.onload = function() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      // TAKAISIN ALOITUSSIVULLE
      window.location.href = 'index.html';
    });
  }
};


// SULJE NAPPI
// Hae kaikki close-nappien elementit
const closeButtons = document.querySelectorAll('[id^="close"]');

// Käy läpi kaikki close-napit ja lisää tapahtumankäsittelijä kullekin
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        // Hae kyseisen äänestyksen containerin elementti
        const voteContainer = closeButton.closest('.col');
        
        // Piilota äänestyksen container
        voteContainer.style.display = 'none';
    });
});

function closeGallup(button) {
  // Hae kyseisen äänestyksen containerin elementti
  const voteContainer = button.closest('.col');
  
  // Piilota äänestyksen container
  voteContainer.style.display = 'none';
}

/////////////////////////////////////////////////////////////////////////////////

// Funktio luo uuden gallupin pohjan
function createNewGallupTemplate() {
  // Kopioi HTML-mallista
  const template = document.getElementById('gallupTemplate').cloneNode(true);

  // Aseta näkyväksi ja lisää sivulle
  template.style.display = 'block';
  // Aseta templaten leveys
  template.style.maxWidth = '270px';
  document.querySelector('.row').appendChild(template);

  // Aseta ainutlaatuinen id
  const uniqueId = 'gallup' + new Date().getTime();
  template.id = uniqueId;

  // Lisää tapahtumankäsittelijä Enter-näppäimelle
  template.querySelector('#newQuestion').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      acceptNewQuestion(template);
      event.preventDefault();
    }
  });
}

// Funktio tallentaa uuden gallupin Local Storageen
function acceptNewQuestion(template) {
  // Hae kirjoitettu kysymys
  const newQuestion = template.querySelector('#newQuestion').value;

  // Aseta kysymys <h3> -elementtiin
  template.querySelector('h3').innerText = newQuestion;

  // Tyhjennä tekstikenttä
  template.querySelector('#newQuestion').value = '';

  // Poista input-kenttä
  template.querySelector('#newQuestion').style.display = 'none';

  // Tallenna uusi gallup localStorageen
  const timestamp = new Date().getTime(); // Luo aikaleima
  const pollData = {
    question: newQuestion,
    options: {
      option1: { text: 'Joo', count: 0 },
      option2: { text: 'En', count: 0 }
    }
  };
  tallennaGallup(pollData);
}

// Funktio tallentaa gallupin tiedot Local Storageen
function tallennaGallup(gallupData) {
  // Tarkista, onko Local Storage tuettu ja saatavilla
  if (typeof (Storage) !== "undefined") {
    // Hae tallennetut gallupit tai alusta tyhjä taulukko
    let tallennetutGallupit = JSON.parse(localStorage.getItem('gallupit')) || [];

    // Lisää uusi gallup taulukkoon
    tallennetutGallupit.push(gallupData);

    // Tallenna taulukko Local Storageen
    localStorage.setItem('gallupit', JSON.stringify(tallennetutGallupit));
  } else {
    console.error('Local Storagea ei tueta tai se ei ole saatavilla.');
  }
}

// Funktio kysymysten lisäämiseksi sivulle
function lisaaKysymyksetSivulle() {
  // Hae tallennetut gallupit Local Storagesta
  const tallennetutGallupit = JSON.parse(localStorage.getItem('gallupit'));

  // Tarkista, onko tallennettuja kysymyksiä ja että niitä on vähintään yksi
  if (tallennetutGallupit && tallennetutGallupit.length > 0) {
    // Hae sivun rivi, johon lisätään kysymykset
    const row = document.querySelector('.row');

    // Tyhjennä rivin sisältö ennen uusien gallupien lisäämistä
    row.innerHTML = '';

    // Käy läpi tallennetut kysymykset ja lisää ne sivulle
    tallennetutGallupit.forEach((gallup, index) => {
      // Luo div-elementti kysymykselle
      const gallupDiv = document.createElement('div');
      gallupDiv.classList.add('col', 'border', 'pb-3', 'rounded-2', 'ms-2', 'me-3', 'mb-3');

      // Lisää kysymyksen otsikko
      const questionHeader = document.createElement('h3');
      questionHeader.textContent = gallup.question;
      gallupDiv.appendChild(questionHeader);

      // Lisää uniikit ID:t radionapeille
      const option1Id = `RadioGallup${index + 1}Option1`;
      const option2Id = `RadioGallup${index + 1}Option2`;

      // Lisää kysymyksen tilanne ja vastaa-painike
      gallupDiv.innerHTML += `
        <div class="form-check ms-5 me-5">
          <input class="form-check-input" type="radio" name="gallupRadio" id="${option1Id}">
          <label class="form-check-label fw-bold" for="${option1Id}">Joo</label>
        </div>
        <div class="form-check ms-5 me-5">
          <input class="form-check-input" type="radio" name="gallupRadio" id="${option2Id}">
          <label class="form-check-label fw-bold text-danger" for="${option2Id}">En</label>
        </div>
        <br>
        <div class="progress bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-success" style="width: 50%">50% - Joo</div>
        </div>
        <p>Gallupin tilanne</p>
        <br>
        <button type="button" class="btn btn-primary mt-0 border-1 border-white" onclick="vote('gallupRadio', '${option1Id}', '${option2Id}', this)">Vastaa</button>
      `;

      // Lisää kysymys sivulle
      row.appendChild(gallupDiv);
    });
  } else {
    console.log('Ei tallennettuja kysymyksiä.');
  }
}

// Lisää tapahtumankäsittelijä "Hae uudet gallupit" -napille
document.getElementById('haeUudetButton').addEventListener('click', function() {
  // Tarkista, onko localStorage tyhjä
  if (localStorage.getItem('gallupit') === null) {
    // Jos localStorage on tyhjä, näytä virheilmoitus
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    return;
  }
  // Kutsu funktiota kysymysten lisäämiseksi sivulle
  lisaaKysymyksetSivulle();
});


// Funktio hakee tallennetut gallupit Local Storagesta ja näyttää ne sivulla
function haeTallennetutGallupit() {
  const tallennetutGallupit = JSON.parse(localStorage.getItem('gallupit'));

  if (tallennetutGallupit && tallennetutGallupit.length > 0) {
    const row = document.querySelector('.row');
    row.innerHTML = ''; // Tyhjennä olemassa olevat gallupit

    tallennetutGallupit.forEach(gallup => {
      const template = document.getElementById('gallupTemplate').cloneNode(true);
      template.querySelector('h3').innerText = gallup.question;
      row.appendChild(template);
    });
  } 
}

// Sivun päivitys - Tyhjennä
function refreshPage() {
  window.location.reload();
}