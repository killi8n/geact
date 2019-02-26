import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { baseActions } from 'store/modules/base'
import { searchActions } from 'store/modules/search'
import Spinner from 'components/common/Spinner'
import ModalWrapper from 'components/common/ModalWrapper'
import SearchInput from 'components/search/SearchInput'
import SearchResultList from 'components/search/SearchResultList'
import LoadMoreButton from 'components/more/LoadMoreButton'
import BottomSpinner from 'components/common/BottomSpinner'
import parseLinkHeader from 'parse-link-header'

class ModalContainer extends Component {
    state = {
        firstLoading: true,
    }

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
        this.setState({
            firstLoading: true,
        })
    }

    handleChangeSearch = ({ value }) => {
        const { SearchActions } = this.props
        SearchActions.changeInput({ value })
    }

    searchByUsername = async ({ page }) => {
        const { SearchActions, input } = this.props

        try {
            await SearchActions.searchByUsername({
                username: input,
                accessToken: localStorage.getItem('access_token'),
                page,
            })
            if (!this.state.firstLoading) {
                this.setState({
                    firstLoading: false,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    loadMoreUser = async () => {
        const { SearchActions, input, link } = this.props
        const parsed = parseLinkHeader(link)
        if (!parsed.next) return
        try {
            await SearchActions.searchByUsername({
                username: input,
                accessToken: localStorage.getItem('access_token'),
                page: parsed.next.page,
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { modal, input, userLoading, users, link } = this.props
        const { handleChangeSearch, searchByUsername, loadMoreUser } = this

        return (
            <>
                <ModalWrapper visible={modal.search.visible}>
                    {userLoading && this.state.firstLoading && <Spinner />}
                    {!users && (
                        <SearchInput
                            onChangeInput={handleChangeSearch}
                            input={input}
                            searchByUsername={searchByUsername}
                        />
                    )}
                    {users && users.items.length > 0 && (
                        <>
                            <SearchResultList list={users.items} />
                            {link && <LoadMoreButton onClick={loadMoreUser} />}
                            {userLoading && !this.state.firstLoading && (
                                <BottomSpinner />
                            )}
                        </>
                    )}
                </ModalWrapper>
            </>
        )
    }
}

export default connect(
    ({ base, search, pender }) => ({
        modal: base.modal,
        input: search.searchInput,
        userLoading: pender.pending['search/SEARCH_BY_USERNAME'],
        users: search.result.users,
        link: search.result.link,
    }),
    dispatch => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        SearchActions: bindActionCreators(searchActions, dispatch),
    })
)(ModalContainer)
