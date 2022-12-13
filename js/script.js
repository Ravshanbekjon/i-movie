const elForm = selectElem('.form');
const elSearchInput = selectElem('.films__input-serach');
const elSelect = selectElem('.films__select');
const elList = selectElem('.films__card-wrapper');
const elFilter = selectElem('.films__filter');
const elModal = selectElem('.modal');
const elModalClose = selectElem('.modal__close-btn');
const elTemplate = selectElem('#template').content;


elModalClose.addEventListener('click', () => {
    elModal.classList.remove('modal-active')
})

elModal.addEventListener('click', (e) => {

    let dataId = e.target.dataset.modal;

    if(dataId == 1){
        elModal.classList.remove('modal-active')
    }

})

function renderArr(arr, list) {

    list.innerHTML = null;

    arr?.forEach(element => {
        let cloneTemplate = elTemplate.cloneNode(true)

        selectElem('.films__img', cloneTemplate).src = element.poster;
        selectElem('.films__card-title', cloneTemplate).textContent = element.title;
        selectElem('.films__release-date', cloneTemplate).textContent = normalizeDate(element.release_date);

        let filmsBtn = selectElem('.films__btn', cloneTemplate)
        filmsBtn.dataset.id = element.id

        filmsBtn.addEventListener('click', (e) => {
            elModal.classList.add('modal-active')

            let filmId = e.target.dataset.id;

            let findFilm = films.find(item => item.id == filmId)

            let modalImg = selectElem('.modal__img', elModal)
            let modalTitle = selectElem('.modal__title', elModal)
            let modalDiscription = selectElem('.modal__description', elModal)
            let elGenreListModal = selectElem('.genre__list', elModal)


            modalImg.setAttribute('src', findFilm.poster)
            modalTitle.textContent = findFilm.title
            modalDiscription.textContent = findFilm.overview

            elGenreListModal.innerHTML = null

            findFilm.genres.forEach(item => {
                let newLi = createElem('li')
                newLi.textContent = item

                elGenreListModal.appendChild(newLi)
            })
        })

        // filmsBtn?.forEach(btn => {


        //     btn?.addEventListener('click', () => {
        //         elModal.classList.add('modal-active')
        //     })
        // })

        list.appendChild(cloneTemplate)
    });
}

function renderGenres(arr, list) {

    let uniqueGenres = []

    arr?.forEach(item => {
        item?.genres?.forEach((genre) => {
            if (!uniqueGenres.includes(genre)) {
                uniqueGenres.push(genre)
            }
        })
    })

    uniqueGenres?.forEach(item => {
        let newOption = createElem('option')
        newOption.textContent = item
        newOption.value = item
        list.appendChild(newOption)
    })

}

renderGenres(films, elSelect)


elForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let regex = new RegExp(elSearchInput.value.trim(), 'gi')

    let filteredArr = films.filter(film => film.title.match(regex))

    let filteredFilm = []

    if (elSelect.value.trim() === "All") {
        filteredFilm = filteredArr
    } else {
        filteredFilm = filteredArr.filter(item => item.genres.includes(elSelect.value.trim()))
    }

    let filteredByAlph = filteredFilm.sort((a, b) => {
        if (a.title > b.title) {
            return 1
        }
        else if (a.title < b.title) {
            return -1
        }
        else {
            return 0
        }
    })

    let filteredByDate = filteredFilm.sort((a, b) => a.release_date - b.release_date)

    if (elFilter.value === 'all') {
        filteredFilm = filteredFilm
    } else if (elFilter.value === 'a_z') {
        filteredFilm = filteredByAlph
    } else if (elFilter.value === 'z_a') {
        filteredFilm = filteredByAlph.reverse()
    } else if (elFilter.value === 'old_new') {
        filteredFilm = filteredByDate
    } else if (elFilter.value === 'new_old') {
        filteredFilm = filteredByDate.reverse()
    }


    renderArr(filteredFilm, elList)

    elSearchInput.value = null
})

renderArr(films, elList)
