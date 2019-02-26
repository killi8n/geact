import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalWrapper from 'components/common/ModalWrapper'
import SearchInput from 'components/search/SearchInput'

class ModalContainer extends Component {
    render() {
        const { modal } = this.props
        return (
            <>
                <ModalWrapper visible={modal.search.visible}>
                    <SearchInput />
                </ModalWrapper>
            </>
        )
    }
}

export default connect(({ base }) => ({
    modal: base.modal,
}))(ModalContainer)
