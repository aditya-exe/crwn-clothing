import React, {lazy, Suspense, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {ShopPageContainer} from "./shop.styles";
import {connect} from 'react-redux'
import Spinner from "../../components/spinner/spinner.component";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";

const CollectionPageContainer = lazy(() => import('../collection/collection.container'));
const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'))

const ShopPage = ({fetchCollectionsStart, match}) => {
    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);

    return (
        <ShopPageContainer>
            <Suspense fallback={<Spinner/>}>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </Suspense>
        </ShopPageContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
