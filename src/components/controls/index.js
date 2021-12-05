import React from "react"
import propTypes from "prop-types"
import plural from "plural-ru"
import "./styles.css"

function Controls({ isOpen, cart }) {
    // console.log("Controls")
    const price = cart.map((i) => i.price * i.count)
    const priceSum = price.reduce((p, a) => {
        return p + a
    }, 0)
    const number = cart.map((i) => i.count)
    const numberSum = number.reduce((p, a) => {
        return p + a
    }, 0)

    return (
        <div className="Controls">
            <div>
                В корзине:{" "}
                <span>
                    <b>
                        {numberSum}{" "}
                        {plural(numberSum, "товар", "товара", "товаров")} /{" "}
                        {priceSum} Р
                    </b>
                </span>
            </div>
            <button onClick={() => isOpen(true)} style={{ marginLeft: 15 }}>
                Перейти
            </button>
            {/* <button onClick={onCreate}> Добавить</button> */}
        </div>
    )
}

Controls.propTypes = {
    onCreate: propTypes.func.isRequired,
}

Controls.defaultProps = {
    onCreate: () => {},
}

export default React.memo(Controls)
