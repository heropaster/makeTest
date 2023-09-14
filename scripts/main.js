initInputs()

function initInputs() {
   const inputs = document.querySelectorAll('.ui__input')

   for (let item of inputs) {
      const placeholder = item.nextElementSibling
      //    При добавлении текста добавляется класс активности(Кастомный плейсхолдер остается вверху)
      item.addEventListener('input', function () {
         if (this.value.trim() !== '') {
            placeholder.classList.add('active')
         } else {
            placeholder.classList.remove('active')
         }
      })
      // Если при выходе из инпута оставить пустой текст, кастомный плейсхолдер вернется на место
      item.addEventListener('blur', function () {
         if (this.value.trim() === '') {
            placeholder.classList.remove('active')
         }
      })
   }
   //    Валидация
   inputs[0].addEventListener('input', function () {
      const placeholder = inputs[0].nextElementSibling
      const errorMessage = placeholder.nextElementSibling
      if (!isValidEmail(this.value)) {
         this.classList.add('error')
         placeholder.classList.add('error')
         errorMessage.style.display = 'block'
         errorMessage.innerHTML = 'Почта должна содержать символ "@"'
      } else {
         this.classList.remove('error')
         placeholder.classList.remove('error')
         errorMessage.style.display = 'none'
      }
   })
   function isValidEmail(email) {
      // Регулярное выражение для валидации email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(email)
   }
}
