export class UIManager{
    constructor(repository){
        this.repo = repository;

        this.elements = {
            numOfGames : document.querySelector('#num-of-games'),
            mostExpensive : document.querySelector('#most-expensive'),
            ps4Compatible : document.querySelector('#ps4-compatible'),
            searchByYear : document.querySelector('#search-by-year'),
            searchByYearResults : document.querySelector('#search-by-year-results'),
            submitSearchByYear : document.querySelector('#submit-search-by-year'),

            gameList : document.querySelector('#game-list'),

            searchImage : document.querySelector('#search-image'),
            searchName : document.querySelector('#search-name'),
            searchYear : document.querySelector('#search-year'),
            searchPublisher : document.querySelector('#search-publisher'),
            searchDeveloper : document.querySelector('#search-developer'),
            searchPlatform : document.querySelector('#search-platform'),
            searchDescription : document.querySelector('#search-description'),
        }

        this.init();
    }

    init(){
        this.renderNumOfGames();
        this.renderMostExpensiveGame();
        this.renderPS4CompatibleGames();
        this.elements.submitSearchByYear.addEventListener('click', () => {
            const year = Number(this.elements.searchByYear.value);
            this.renderGamesByYear(year);
        })
        this.populateGamaDatalist();
        this.elements.gameList.addEventListener('change', () => {
            this.renderGameByname();
        });
        if (this.repo.games.length > 0) {
            const firstGame = this.repo.games[0];
            this.elements.gameList.value = firstGame.videogame;
            this.renderGameByname(firstGame.videogame);
        }
    }

    renderNumOfGames(){
        this.elements.numOfGames.innerHTML = this.repo.getNumOfGames();
    }

    renderMostExpensiveGame(){
        const game = this.repo.getMostExpensiveGame();
        this.elements.mostExpensive.innerHTML = `
        <span class="fs-4 fw-semibold text-success">${game.videogame}</span><br>
        <span>Költség: <span class="fw-bold">${game.getFormattedCost()}</span></span>
        `
    }

    renderPS4CompatibleGames(){
        const games = this.repo.getPS4CompatibleGames();
        this.elements.ps4Compatible.innerHTML = '';
        games.forEach(game => {
            const li = document.createElement('li')
            li.className = 'list-group-item d-flex justify-content-between';
            li.innerHTML = `
                <span>${game.videogame}</span>
                <span class="badge rounded-pill bg-secondary">${game.year}</span>
            `;
            this.elements.ps4Compatible.appendChild(li)
        });
    }

    renderGamesByYear(year){
        this.elements.searchByYearResults.innerHTML = '';
        const games = this.repo.getGamesByYear(year);
        if (games.length === 0) {
            this.elements.searchByYearResults.innerHTML = `
            <li class="list-group-item text-danger text-center">
                Nincs ebből az évből videójáték!
            </li>`;
            return;
        }
        games.forEach(game => {
            const li = document.createElement('li')
            li.className = 'list-group-item';
            li.innerHTML = `<span>${game.videogame}</span>`;
            this.elements.searchByYearResults.appendChild(li)
        });
    }

    populateGamaDatalist(){
        const games = this.repo.games.map(game => game.videogame);
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game;
            option.innerText = game;
            this.elements.gameList.appendChild(option);
        });
    }

    renderGameByname(){
        const name = this.elements.gameList.value;
        const game = this.repo.getGameByName(name);

        this.elements.searchImage.src = game.image;

        this.elements.searchName.innerText = game.videogame;
        this.elements.searchYear.innerText = game.year;
        this.elements.searchPublisher.innerText = game.publisher;        
        this.elements.searchDeveloper.innerHTML = `<span class="fw-bold">Fejlesztő: </span>${game.developer}`;
        this.elements.searchPlatform.innerHTML = `<span class="fw-bold">Platform: </span>${game.platform}`;
        this.elements.searchDescription.innerText = game.description;

    }
}