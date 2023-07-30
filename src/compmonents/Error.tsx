import React from "react";
import { RootState } from "../redux/store";
import { ErrorState, selectError } from "../redux/error";
import { connect } from "react-redux";

interface IProps {
    error: ErrorState
}
const
    mapStateToProps = (state: RootState) => ({ error: selectError(state) }),
    connector = connect(mapStateToProps);

class Error extends React.Component<IProps> {
    shouldComponentUpdate () : boolean {
        return true;
    }

    render () {
        const { error } = this.props;

        console.log(error.message); // FIXME: must be a slice in store

        if (error.message !== "") {
            return;
        }

        return (
            <h1>
                {error.message}
            </h1>
        );
    }
}

export default connector(Error);
