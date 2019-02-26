import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalWrapper from 'components/common/ModalWrapper'
import SearchInput from 'components/search/SearchInput'
import { bindActionCreators } from 'redux'
import { baseActions } from 'store/modules/base'
import { searchActions } from 'store/modules/search'

class ModalContainer extends Component {
    componentWillUnmount() {
        let flag = false
        Object.keys(this.props.modal).forEach(modalname => {
            if (this.props.modal[modalname].visible) {
                flag = true
            }
        })

        if (flag) {
            this.removeListeners()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevModal = prevProps.modal
        const nowModal = this.props.modal

        Object.keys(nowModal).forEach(modalname => {
            if (
                nowModal[modalname].visible !== prevModal[modalname] &&
                nowModal[modalname]
            ) {
                this.addListeners()
            }
        })
    }

    addListeners = () => {
        if (window) {
            window.addEventListener('keydown', this.handleKeyPress)
        }

        if (document && document.body) {
            document.body.addEventListener('keydown', this.handleKeyPress)
        }
    }

    removeListeners = () => {
        if (window) {
            window.removeEventListener('keydown', this.handleKeyPress)
        }

        if (document && document.body) {
            document.body.removeEventListener('keydown', this.handleKeyPress)
        }
    }

    handleKeyPress = e => {
        if (e.key === 'Escape') {
            this.hideModal()
        }
    }

    hideModal = () => {
        const { BaseActions, SearchActions } = this.props
        SearchActions.initialize()
        BaseActions.hideModal()
    }

    handleChangeSearch = ({ value }) => {
        const { SearchActions } = this.props
        SearchActions.changeInput({ value })
    }

    render() {
        const { modal, input } = this.props
        const { handleChangeSearch } = this
        return (
            <>
                <ModalWrapper visible={modal.search.visible}>
                    <SearchInput
                        onChangeInput={handleChangeSearch}
                        input={input}
                    />
                </ModalWrapper>
            </>
        )
    }
}

export default connect(
    ({ base, search }) => ({
        modal: base.modal,
        input: search.searchInput,
    }),
    dispatch => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch),
    })
)(ModalContainer)
