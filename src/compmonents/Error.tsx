import "./Errors.scss";

import React from "react";
import { Button } from "react-bootstrap";
import { selectErrors } from "../redux/error";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import Badge from "react-bootstrap/Badge";

interface IProps {
    readonly errors: string[]
}
const
    mapStateToProps = (state: RootState): IProps => ({ errors: selectErrors(state) }),
    connector = connect(mapStateToProps);

class Error extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    shouldComponentUpdate () : boolean {
        return true;
    }

    handleClose() {
        console.log("HERE"); // TODO
    }

    render () {
        const { errors } = this.props;

        if (errors.length === 0) {
            return;
        }

        let badges = [];
        errors.forEach((error: string, index: number) => {
            badges.push((
                <div>
                    <Badge bg="danger" key={index}>
                        {error}
                    </Badge>
                </div>
            ));
        });

        return (
            <div className={"errors"}>
                <Button variant={"link"} onClick={this.handleClose}>Close All</Button>
                {badges}
            </div>
        );
    }
}

export default connector(Error);
