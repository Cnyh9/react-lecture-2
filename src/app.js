import React, { useCallback, useState } from "react"
import Controls from "./components/controls"
import List from "./components/list"
import Layout from "./components/layout"
import Modal from "./components/modal"

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
    // console.log("App")

    const callbacks = {
        onCreateItem: useCallback(() => store.createItem(), [store]),
        onSelectItem: useCallback((code) => store.selectItem(code), [store]),
        onDeleteItem: useCallback((code) => store.deleteItem(code), [store]),
        onAddToCardItem: useCallback(
            (code) => store.addToCardItem(code),
            [store]
        ),
    }

    console.log(store.getState(), "state")
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <Layout head={<h1>Магазин</h1>}>
            <Controls isOpen={setModalIsOpen} cart={store.getState().cart} />
            <List
                items={store.getState().items}
                onSelectItem={callbacks.onSelectItem}
                onDeleteItem={callbacks.onDeleteItem}
                onAddToCardItem={callbacks.onAddToCardItem}
            />
            <Modal
                isOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
                cart={store.getState().cart}
            />
        </Layout>
    )
}

export default App
