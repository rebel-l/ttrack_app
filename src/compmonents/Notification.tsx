import "./Errors.scss";

import React from "react";
import { Button } from "react-bootstrap";
import { resetAction, selectNotifications } from "../redux/notifcations";
import { RootState } from "../redux/store";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import Badge from "react-bootstrap/Badge";

interface ResetFunc {
    (): void;
}

interface IProps {
    readonly errors: string[]
    readonly doReset: ResetFunc
}

const
    doReset: ResetFunc = () => async (dispatch) => {
        dispatch(resetAction())
    },
    mapStateToProps = (state: RootState) => ({ errors: selectNotifications(state)}),
    mapDispatchToProps = {
        doReset
    },
    connector: InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

class Notification extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    shouldComponentUpdate () : boolean {
        return true;
    }

    handleClose() {
        this.props.doReset();
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

export default connector(Notification);
