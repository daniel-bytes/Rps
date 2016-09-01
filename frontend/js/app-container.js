import { connect } from 'react-redux'
import AppCanvas from './app-canvas'
import { selectToken, releaseToken, clearSelection } from './actions';

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state, {
        width: 800,
        height: 800,
        tokenWidth: 50,
        tokenHeight: 50,
        tokenSpacing: 10,
        rows: state.parameters.rows,
        cols: state.parameters.cols,
        isPlayerTurn: state.parameters.currentPlayer === 0
    });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTokenSelected: (coordinates) => {
            dispatch(selectToken(coordinates));
        },

        onTokenReleased: (coordinates) => {
            dispatch(releaseToken(coordinates));
        },

        onSelectionCleared: () => {
            dispatch(clearSelection());
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCanvas);

export default AppContainer;