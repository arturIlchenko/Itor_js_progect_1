/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};
	
	// promoAdvBlock.style.display = 'none';

	const removeAddBlock = () => {
		document.querySelector('.promo__adv').remove();
		document.querySelector('.promo__content').style.width = 'calc(100% - 300px)';
	};

	const changeContent = () => {
		document.querySelector('.promo__genre').textContent = 'Драма';
		document.querySelector('.promo__bg').style.backgroundImage = 'url(img/bg.jpg)';
	}

	removeAddBlock();

	changeContent();

	const interactivList = document.querySelector('.promo__interactive-list');
	
	
	// Объявление переменных
	
	const button = document.querySelector('.add button'),
			form = document.querySelector('.add'),
			addInput = form.querySelector('.adding__input'),
			likeCheck = form.querySelector('[type="checkbox"]');
	
	// Добавление фильма в список
	
	button.addEventListener('click', (event) => {
		event.preventDefault();
		addMovieToBase(addInput.value, movieDB.movies);
		if (likeCheck.checked) {
			console.log('Добавляем любимый фильм')
		}
		form.reset();
	});
	
	function addMovieToBase (data, dataBase){
		if  (data) {
			if (data.length > 21) {
				data = `${data.substring(0, 21)}...`;
			};
			dataBase.push(data.toUpperCase());
			renderInteractivList(dataBase);
		}
	};
	
	// Генерация списка фильмов на странице
	
	const renderInteractivList = (movies) => {
		interactivList.innerHTML = '';
		movies.sort();
		movies.forEach((element, index) => {
			let li = document.createElement('li');
			li.innerHTML = `${index + 1}. ${element} <div class="delete"></div>`;
			li.classList.add('promo__interactive-item')
			interactivList.appendChild(li)
		});
		document.querySelectorAll('.delete').forEach((item, id) => {
			item.addEventListener('click', () => {
				item.parentElement.remove();
				movies.splice(id, 1);
				renderInteractivList(movies);
			});
		});
	};
	
	
	
	
	renderInteractivList(movieDB.movies);
	
	
	// const deleteIcon = document.querySelector('.delete');
	
	// deleteIcon.addEventListener('click', (event) => {
	// 	console.log(event.target.parentNode);
	// 	event.target.parentNode.style('display= "none"')
	// });
})
