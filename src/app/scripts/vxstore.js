export default {
  state: {
    cards: {
      'В работе': [
        {text: 'Пример текста карточки'},
        {text: 'Очень большая и сложная задача, которую необходимо обсудить с коллегами'},
        {text: 'Лёгкий вопрос'},
      ],
      'На проверке': [
        {text: 'Стрела. Последний 8 сезон. 2019 - 2020'},
      ],
      'Выполнено': [
        {text: 'Игра престолов'},
        {text: 'Мстители'},
        {text: 'Люди Х'},
        {text: 'Звёздные войны'},
      ],
    }, // cards

    category: '',
    currentId: 0,
  }, // state

  mutations: {
    addNote(state, data) {
      state.cards[data.category].push( {text: data.text} );
    },

    updateNote(state, data) {
      let row = state.cards[state.category][state.currentId];
      row.text = data.text;
      row.description = data.description;
    },

    setCurrentRecord(state, data) {
      state.category  = data.category;
      state.currentId = data.currentId;
    }
  } // mutations
}
