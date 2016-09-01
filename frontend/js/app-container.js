import { connect } from 'react-redux'
import AppCanvas from './app-canvas'
import { selectToken, releaseToken, clearSelection } from './actions';

const mapStateToProps = (state, ownProps) => {
    return {
        rows: 8, 
        cols: 8, 
        width: 800,
        height: 800,
        tokenWidth: 50,
        tokenHeight: 50,
        tokenSpacing: 10
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTokenSelected: (coordinates) => {
            console.log(`mapDispatchToProps.onTokenSelected(${JSON.stringify(coordinates)})`);
            dispatch(selectToken(coordinates));
        },

        onTokenReleased: (coordinates) => {
            console.log(`mapDispatchToProps.onTokenReleased(${JSON.stringify(coordinates)})`);
            dispatch(releaseToken(coordinates));
        },

        onSelectionCleared: () => {
            console.log('mapDispatchToProps.onSelectionCleared()');
            dispatch(clearSelection());
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCanvas);

export default AppContainer;