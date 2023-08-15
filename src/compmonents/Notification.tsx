import "./Notification.scss";

import React from "react";
import { Button } from "react-bootstrap";
import { Notification, resetAction, selectNotifications } from "../redux/notifcations";
import { RootState } from "../redux/store";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import Badge from "react-bootstrap/Badge";

interface ResetFunc {
    (): void;
}

interface IProps {
    readonly notifications: Notification[]
    readonly reset: ResetFunc
}

const
    reset: ResetFunc = () => async (dispatch) => {
        dispatch(resetAction())
    },
    mapStateToProps = (state: RootState) => ({ notifications: selectNotifications(state)}),
    mapDispatchToProps = {
        reset
    },
    connector: InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

class NotificationComp extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    shouldComponentUpdate () : boolean {
        return true;
    }

    handleClose() {
        this.props.reset();
    }

    render () {
        const { notifications } = this.props;

        if (notifications.length === 0) {
            return;
        }

        let badges = [];
        notifications.forEach((notification: Notification, index: number) => {
            badges.push((
                <div>
                    <Badge bg={notification.type} key={index}>
                        {notification.message}
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

export default connector(NotificationComp);
