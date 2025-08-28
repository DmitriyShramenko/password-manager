export function fakeApi(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.5 ? resolve(data) : reject(new Error('Ошибка сохранения (симуляция).'))
    }, 600)
  })
}