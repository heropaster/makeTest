initScripts();
function initScripts() {
	initInputs();
	initSelects();
	initAccordions();
	initMenu();
	initTabs();
	smoothAnchors();
	initAside();
}
// Текстовые поля
function initInputs() {
	const inputs = document.querySelectorAll(".ui__input");

	for (let item of inputs) {
		const placeholder = item.nextElementSibling;
		//    При добавлении текста добавляется класс активности(Кастомный плейсхолдер остается вверху)
		item.addEventListener("input", function () {
			if (this.value.trim() !== "") {
				placeholder.classList.add("active");
			} else {
				placeholder.classList.remove("active");
			}
		});
		// Если при выходе из инпута оставить пустой текст, кастомный плейсхолдер вернется на место
		item.addEventListener("blur", function () {
			if (this.value.trim() === "") {
				placeholder.classList.remove("active");
			}
		});
	}
	//    Валидация
	inputs[0].addEventListener("input", function () {
		const placeholder = inputs[0].nextElementSibling;
		const errorMessage = placeholder.nextElementSibling;
		if (!isValidEmail(this.value)) {
			this.classList.add("error");
			placeholder.classList.add("error");
			errorMessage.style.display = "block";
			errorMessage.innerHTML = 'Почта должна содержать символ "@"';
		} else {
			this.classList.remove("error");
			placeholder.classList.remove("error");
			errorMessage.style.display = "none";
		}
	});
	function isValidEmail(email) {
		// Регулярное выражение для валидации email
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email);
	}
}
// Выпадающие списки
function initSelects() {
	const selectBox = document.querySelector(".select-box");
	const options = document.querySelector(".options");
	const optionItems = options.querySelectorAll(".option");
	selectBox.addEventListener("click", () => {
		selectBox.classList.toggle("active");
		selectBox.classList.add("used");
		options.classList.toggle("active");
	});
	optionItems.forEach((item) => {
		item.addEventListener("click", function () {
			optionItems.forEach((option) => {
				option.classList.remove("selected");
			});
			this.classList.add("selected");
			//  Для кастомного плейсхолдера
			selectBox.classList.remove("used");
			selectBox.classList.add("used");

			const selectedOption = this.innerHTML;
			document.querySelector(".selected-item").innerHTML = selectedOption;
			selectBox.classList.toggle("active");
			options.classList.toggle("active");
		});
	});
}
// Аккордионы
function initAccordions() {
	const accordions = document.querySelectorAll(".accordion");
	const headers = accordions[0].querySelector(".accordion__header");

	headers.addEventListener("click", () => {
		accordions[0].classList.toggle("active");
	});
}
// Меню
function initMenu() {
	const menuBtn = document.querySelector(".menu");
	const menuLayout = document.querySelector(".menu-layout");
	menuBtn.addEventListener("click", () => {
		menuBtn.classList.toggle("active");
		menuLayout.classList.toggle("active");
		hideScroll();
	});
}
function hideScroll() {
	if (document.body.style.overflow === "hidden") {
		document.body.style.overflow = "auto";
	} else {
		document.body.style.overflow = "hidden";
	}
}
// Tabs
function initTabs() {
	let tabs = document.querySelectorAll(".tab");
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			// Удаление класса "active-tab" у всех вкладок
			tabs.forEach((t) => t.classList.remove("active-tab"));
			tab.classList.add("active-tab");

			// Получение id выбранной вкладки (desktop или mobile)
			const selectedTabId = tab.id;

			const desktopTab = document.querySelector(".desktop-tab");
			const mobileTab = document.querySelector(".mobile-tab");
			if (selectedTabId === "desktop") {
				// Показать содержимое для десктопа
				desktopTab.style.display = "grid";
				mobileTab.style.display = "none";
			} else if (selectedTabId === "mobile") {
				// Показать содержимое для мобильного устройства
				mobileTab.style.display = "grid";
				desktopTab.style.display = "none";
			}
		});
	});
}

function smoothAnchors() {
	const anchorLinks = document.querySelectorAll(".aside-menu__link");
	anchorLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			anchorLinks.forEach((item) => {
				item.classList.remove("active-link");
			});
			link.classList.add("active-link");
			const targetId = link.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);
			targetSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});
}
function initAside() {
	const btn = document.querySelector(".aside-btn");
	const asideBlock = document.querySelector(".aside-menu");
	btn.addEventListener("click", () => {
		btn.classList.toggle("active");
		asideBlock.classList.toggle("opened");
	});
}
