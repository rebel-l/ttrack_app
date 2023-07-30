import React from "react";
import { selectError } from "../redux/error";
import { RootState } from "../redux/store";
import { connect } from "react-redux";

interface IProps {
    error: string
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

        console.log("WE ARE HERE", error)

        if (error === "") {
            return;
        }

        return (
            <h1>
                {error}
            </h1>
        );
    }
}

export default connector(Error);
