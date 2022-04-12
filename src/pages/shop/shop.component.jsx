import React from "react";
import {Route} from 'react-router-dom'
import CollectionsOverview from "../../components/collections-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import {connect} from 'react-redux'
import {fetchCollectionsStartAsync} from "./shops.actions";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()
    }


    render() {
        const {match, isCollectionFetching, isCollectionsLoaded} = this.props

        return (
            <div className={'shop-page'}>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverviewWithSpinner
                           isLoading={isCollectionFetching} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}/>
            </div>

        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)