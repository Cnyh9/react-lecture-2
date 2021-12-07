class Store {
    constructor(initState) {
        // Состояние приложения (данные)
        this.state = initState
        // Подписчики на изменение state
        this.listners = []
    }

    /**
     * Подписка на изменение state
     * @param callback {Function}
     */
    subscribe(callback) {
        this.listners.push(callback)
        // Возвращаем функцию для отписки
        return () => {
            this.listners = this.listners.filter((item) => item !== callback)
        }
    }

    /**
     * Выбор state
     * @return {*}
     */
    getState() {
        return this.state
    }

    /**
     * Установка state
     * @param newState {*}
     */
    setState(newState) {
        this.state = newState
        // Оповещаем всех подписчиков об изменении стейта
        for (const lister of this.listners) {
            lister(this.state)
        }
    }

    // Действия приложения.
    // @todo
    // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
    // Может быть как модуль (расширение) для Store

    /**
     * Создание записи
     */
    createItem() {
        const code =
            Math.max(0, ...this.state.items.map((item) => item.code)) + 1
        this.setState({
            items: this.state.items.concat({
                code,
                title: "Новая запись №" + code,
            }),
        })
    }

    /**
     * Удаление записи по её коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            items: this.state.items.filter((item) => item.code !== code),
        })
    }

    /**
     * Выделение записи по её коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            items: this.state.items.map((item) => {
                if (item.code === code) {
                    return {
                        ...item,
                        selected: !item.selected,
                    }
                }
                return item
            }),
        })
    }

    addToCardItem(code) {
        const newItem = this.state.items.filter((item) => item.code === code)
        if (this.state?.cart[code - 1]?.title === newItem.title) {
            this.setState({
                ...this.state,
                cart: [...this.state.cart, { ...newItem[0], count: 1 }],
            })
        } else {
            this.setState({
                ...this.state,
                cart: this.state.cart.map((el) => {
                    if (el.code === code) {
                        return { ...el, count: el.count + 1 }
                    }
                    return el
                }),
            })
        }
    }
}

export default Store
