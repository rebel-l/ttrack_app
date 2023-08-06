import React from "react";
import { selectError } from "../redux/error";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import Badge from "react-bootstrap/Badge";

interface IProps {
    readonly error: string
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

        if (error === "") {
            return;
        }

        return (
            <Badge bg="danger">
                {error}
            </Badge>
        );
    }
}

export default connector(Error);
