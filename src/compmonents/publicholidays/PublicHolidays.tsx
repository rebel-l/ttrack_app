import React from "react";
import { Button } from "react-bootstrap";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { PublicHolidays } from "../../models/PublicHolidays";
import { selectPreview } from "../../redux/public-holidays";
import { RootState } from "../../redux/store";
import { loadPublicHolidays, LoadPublicHolidaysFunc } from "../../service/api-feiertage";
import Preview from "./Preview";

const
    mapDispatchToProps = { loadPublicHolidays },
    mapStateToProps = (state: RootState) => ({ preview: selectPreview(state) }),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

interface IProps {
    readonly loadPublicHolidays: LoadPublicHolidaysFunc;
    readonly preview: PublicHolidays;
}

class PublicHolidaysComp extends React.Component<IProps, any> {
    constructor (props: IProps) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
    }

    handleLoad () {
        this.props.loadPublicHolidays(2025);
    }

    render () {
        const { preview } = this.props;

        return (
            <div>
                <Button onClick={this.handleLoad} >
                    Load
                </Button>
                <Preview preview={preview} />
            </div>
        );
    }
}

export default connector(PublicHolidaysComp);
