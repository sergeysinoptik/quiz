class Quiz {
  constructor(questions, results) {
    this.questions = questions;
    this.results = results;
    this.current = 0;
    this.currentResultsArray = [];
    this.quizBlockSelector = document.querySelector('#quizBlock');
    this.formSelector = document.querySelector('#quizForm');;
    this.formBlockSelector = document.querySelector('#quizFormBlock');;
  }

  Next() {
    let btns = document.getElementsByClassName("quiz-button_correct");
    let answersResult = [];
    for (let i = 0; i < btns.length; i++) {
      answersResult.push(btns[i].innerHTML || btns[i].value);
    }
    let questionName = this.questions[this.current].question;
    this.results.push({ [questionName]: answersResult });
    this.current += 1;
    if (this.current >= this.questions.length) {
      this.End();
    }
  }

  Previous() {
    let currentResultsObject = this.results.pop();
    this.current -= 1;
    let currentQuestionName = this.questions[this.current].question;
    this.currentResultsArray = currentResultsObject[currentQuestionName];
  }

  PreviousUpdate(previousResult) {
    let btns = document.getElementsByClassName("quiz-button");
    for (let i = 0; i < btns.length; i += 1) {
      let text = btns[i].innerHTML
      if (previousResult.includes(text)) {
        btns[i].classList.add('quiz-button_correct');
      } else {
        btns[i].classList.add('quiz-button_passive');
      }
    }
    this.currentResultsArray.pop();
  }

  End() {
    console.log(this.results);
    this.formBlockSelector.style.display = 'block';
    this.quizBlockSelector.style.display = 'none';
  }

  Update() {
    if (this.current < this.questions.length) {
      headElem.innerHTML = this.questions[this.current].question;
      buttonsElem.innerHTML = "";
      this.PreviousButtonStatus();
      this.CreateButtons();
      counterElem.innerHTML = this.current + 1;
      questionsLengthElem.innerHTML = this.questions.length;
      saleElem.innerHTML = (this.current + 1) * 2;
      let btns = document.getElementsByClassName("quiz-button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
          Click(e.target.getAttribute("index"));
        });
      }
    } else {
      buttonsElem.innerHTML = "";
    }
    nextElem.setAttribute('disabled', true);
    ToggleDisabledStatus();
  }

  /* Click(index) {
    let value = this.questions[this.current].Click(index);
    let resultQuestion = this.questions[this.current].question;
    this.PreviousButtonStatus();
    for (let i = 0; i < this.questions[this.current].answers.length; i += 1) {
      let btn = document.createElement("button");
      btn.className = "quiz-button";
      btn.innerHTML = this.questions[this.current].answers[i].answer;
      btn.setAttribute("index", i);
      buttonsElem.appendChild(btn);
    }
    counterElem.innerHTML = this.current + 1;
    questionsLengthElem.innerHTML = this.questions.length;
    saleElem.innerHTML = (this.current + 1) * 2;
    let btns = document.getElementsByClassName("quiz-button");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (e) {
        Click(e.target.getAttribute("index"));
      });
    }
  } */

  PreviousButtonStatus() {
    if (this.current < 1) {
      previousElem.style.visibility = "hidden";
    } else {
      previousElem.style.visibility = "visible";
    }
  }

  CreateButtons() {
    for (let i = 0; i < this.questions[this.current].answers.length; i += 1) {
      if (this.questions[this.current].type.type === "radio") {
        let btn = document.createElement("button");
        btn.className = "quiz-button";
        btn.innerHTML = this.questions[this.current].answers[i].answer;
        btn.setAttribute("index", i);
        buttonsElem.appendChild(btn);
      } else if (this.questions[this.current].type.type === "checkbox") {
        let btn = document.createElement("button");
        btn.className = "quiz-button btn-25";
        btn.innerHTML = this.questions[this.current].answers[i].answer;
        btn.setAttribute("index", i);
        buttonsElem.appendChild(btn);
      } else {
        let btn = document.createElement("input");
        btn.setAttribute('type', 'text');
        btn.setAttribute('placeholder', this.questions[this.current].answers[i].answer);
        btn.className = "quiz-input";
        btn.setAttribute("index", i);
        buttonsElem.appendChild(btn);
      }
    }
  }
}

class Question {
  constructor(question, answers, type) {
    this.question = question;
    this.answers = answers;
    this.type = type;
  }
  Click(index) {
    return this.answers[index].answer;
  }
}

class Answer {
  constructor(answer) {
    this.answer = answer;
  }
}

class Type {
  constructor(type) {
    this.type = type;
  }
}

const questions = [
  new Question(
    "На что необходимы документы?",
    [
      new Answer("Импортная продукция"),
      new Answer("Продукция производства РФ"),
      new Answer("Нужно несколько документов"),
      new Answer("Другое"),
    ],
    new Type("radio")
  ),
  new Question(
    "Как срочно нужны документы?",
    [
      new Answer("Максимально срочно"),
      new Answer("Не важно"),
      new Answer("В течении 7 дней"),
    ],
    new Type("radio")
  ),
  new Question(
    "На какой срок нужны документы?",
    [new Answer("На 5 лет"), new Answer("На 1 год"), new Answer("На 3 года")],
    new Type("radio")
  ),
  new Question(
    "Для какой цели Вам нужны документы?",
    [
      new Answer("Для прохождения таможни (импорт)"),
      new Answer("Для выхода на зарубежные рынки (экспорт)"),
      new Answer("Для поставки в торговые сети"),
      new Answer("Для прохождения проверки органов надзора"),
      new Answer("Для подтверждения качества продукции"),
      new Answer("Для участия в тендерах и аукционах"),
      new Answer("Для повышения статуса компании"),
      new Answer("Другое"),
    ],
    new Type("checkbox")
  ),
  new Question(
    "Какие данные у вас есть?",
    [
      new Answer("Ничего нет"),
      new Answer("Старые сертификаты"),
      new Answer("Паспорт на продукцию"),
      new Answer("Техническое описание"),
      new Answer("Инструкция по эксплуатации"),
      new Answer("Фотографии/чертежи /протоколы испытаний"),
      new Answer("Каталог продукции"),
      new Answer("Код ТН ВЭД или окп10"),
    ],
    new Type("checkbox")
  ),
  new Question(
    "Какой товар Вы производите (продаёте)?",
    [new Answer("Введите название продукции")],
    new Type("text")
  ),
];

const results = [];

const quiz = new Quiz(questions, results);

const headElem = document.querySelector(".quiz-heading");
const buttonsElem = document.querySelector(".qiuz-buttons__content");
const counterElem = document.querySelector("#counter");
const questionsLengthElem = document.querySelector("#questions-length");
const saleElem = document.querySelector("#sale");
const nextElem = document.querySelector(".quiz-next-button");
const previousElem = document.querySelector(".quiz-previous-button");

function Init() {
  quiz.formBlockSelector.style.display = 'none';
  quiz.Update();

  nextElem.addEventListener("click", function () {
    quiz.Next();
    quiz.Update();
    nextElem.setAttribute('disabled', true);
  });

  previousElem.addEventListener("click", function () {
    quiz.Previous();
    quiz.Update();
    quiz.PreviousUpdate(quiz.currentResultsArray);
  });

  let btns = document.getElementsByClassName("quiz-button");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

Init();

function Click(index) {
  if (quiz.questions[quiz.current].type.type === "radio") {
    //let answer = quiz.Click(index);
    let btns = document.getElementsByClassName("quiz-button");
    for (let i = 0; i < btns.length; i++) {
      btns[i].className = "quiz-button quiz-button_passive";
    }
    btns[index].className = "quiz-button quiz-button_correct";
  } else {
    //let answer = quiz.Click(index);
    let btns = document.getElementsByClassName("quiz-button");
    btns[index].classList.toggle("quiz-button_correct");
  }
  ToggleDisabledStatus();
}

function ToggleDisabledStatus() {
  let btns = document.getElementsByClassName("quiz-button");
  let counter = 0;
  for (let i = 0; i < btns.length; i += 1) {
    let className = btns[i].className;
    if (className.indexOf('quiz-button_correct') >= 0) {
      counter += 1;
    }
  }
  if (counter > 0) {
    nextElem.removeAttribute('disabled');
  } else {
    if (!nextElem.hasAttribute('disabled')) {
      nextElem.setAttribute('disabled', true);
    }
  }
  let inputs = document.getElementsByClassName("quiz-input");
  InputsUpdate(inputs);
}

function InputsUpdate(inputs) {
  let inputsCounters = [];
  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].oninput = function() {
      inputsCounters[i] = inputs[i].value.length;
      if (inputsCounters.includes(0)) {
        nextElem.setAttribute('disabled', true);
        inputs[i].classList.remove('quiz-button_correct');
      } else {
        nextElem.removeAttribute('disabled');
        inputs[i].classList.add('quiz-button_correct');
      }
    }
  }
}