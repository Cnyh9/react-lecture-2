import React from "react"
import "./style.css"

const Modal = ({ isOpen, setIsOpen, cart }) => {
    const price = cart.map((i) => i.price * i.count)
    const priceSum = price.reduce((p, a) => {
        return p + a
    }, 0)
    const number = cart.map((i) => i.count)
    const numberSum = number.reduce((p, a) => {
        return p + a
    }, 0)
    return (
        <div
            className={isOpen ? "modal active" : "modal"}
            onClick={() => setIsOpen(false)}
        >
            <div className="modal__layout" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__header-title">Корзина</div>
                    <div>
                        <button
                            className="modal__header-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
                <div className="modal__content">
                    {cart.map((item, i) => {
                        return (
                            <div className="modal__item" key={item.title}>
                                <div style={{ marginRight: 20 }}>{i + 1}</div>
                                <div style={{ flex: 1 }}>{item.title}</div>
                                <div style={{ marginRight: 55 }}>
                                    {item.price} Р
                                </div>
                                <div>{item.count} шт</div>
                            </div>
                        )
                    })}
                    <div className="modal__total">
                        <div style={{ marginRight: 50 }}>Итого</div>
                        <div style={{ marginRight: 55 }}>{priceSum} Р</div>
                        <div>{numberSum} шт</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Modal)
