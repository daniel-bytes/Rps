import { connect } from 'react-redux'
import AppCanvas from './app-canvas'
import { selectToken, moveToken, clearSelection } from './actions';

const GAMESTATUS_INPROGRESS = 1;

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state, {
        width: 800,
        height: 800,
        tokenWidth: 50,
        tokenHeight: 50,
        tokenSpacing: 10,
        rows: state.parameters.rows,
        cols: state.parameters.cols,
        isPlayerTurn: state.parameters.currentPlayer === 0,
        gameInProgress: state.parameters.status === GAMESTATUS_INPROGRESS
    });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTokenSelected: (coordinates) => {
            dispatch(
                selectToken(coordinates)
            );
        },

        onTokenMoved: (gameid, playerid, from, to) => {
            dispatch(
                moveToken(gameid, playerid, from, to)
            );
        },

        onSelectionCleared: () => {
            dispatch(
                clearSelection()
            );
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCanvas);

export default AppContainer;