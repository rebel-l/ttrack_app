import React from "react";
import { Button } from "react-bootstrap";
import { connect, InferableComponentEnhancerWithProps } from "react-redux";
import { PublicHolidays, PublicHolidaysByYear } from "../../models/PublicHolidays";
import { selectPreview } from "../../redux/api-feiertage";
import { selectCurrent } from "../../redux/public-holidays";
import { RootState } from "../../redux/store";
import { loadApiFeiertage, LoadApiFeiertageFunc } from "../../service/api-feiertage";
import {
    loadPublicHolidays,
    LoadPublicHolidaysFunc,
    savePublicHolidays,
    SavePublicHolidaysFunc,
} from "../../service/publicholidays";
import Preview from "./Preview";

const
    mapDispatchToProps = { loadApiFeiertage: loadApiFeiertage, loadPublicHolidays: loadPublicHolidays, savePublicHolidays: savePublicHolidays },
    mapStateToProps = (state: RootState) => ({ preview: selectPreview(state), current: selectCurrent(state) }),
    connector : InferableComponentEnhancerWithProps<any, any> = connect(mapStateToProps, mapDispatchToProps);

interface IProps {
    readonly loadApiFeiertage: LoadApiFeiertageFunc;
    readonly loadPublicHolidays: LoadPublicHolidaysFunc;
    readonly savePublicHolidays: SavePublicHolidaysFunc;
    readonly preview: PublicHolidays;
    readonly current: PublicHolidaysByYear;
}

interface IState {
    previewYear: number;
}

class PublicHolidaysComp extends React.Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount (): void {
        this.props.loadPublicHolidays();
    }

    handleLoad (event) {
        this.props.loadApiFeiertage(event.target.value);
        this.setState({previewYear: event.target.value});
    }

    handleSave (event) {
        this.props.savePublicHolidays(this.props.preview);
    }

    render () {
        const { preview, current } = this.props;

        let elements = [];
        Object.keys(current).forEach((key) => {
            const list = current[key];
            console.log(key, list); // TODO: remove

            if(list.length ===0) {
                elements.push((
                    <div key={`d-${key}`}>
                        <h2 key={`h-${key}`}>{key}</h2>
                        <Button key={`b-${key}`} value={key} onClick={this.handleLoad}>Load</Button>
                    </div>
                ));
            } else {
                elements.push((
                    <div>
                        <h2 key={`h-${key}`}>{key}</h2>
                        <Preview key={`p-${key}`} preview={list} />
                    </div>
                ));
            }

        });

        let previewElem = null;
        if(preview.length > 0) {
            previewElem = (
                <div>
                    <h1>{this.state.previewYear} - Preview</h1>
                    <Preview preview={preview}/>
                    <Button value={this.state.previewYear} onClick={this.handleSave}>Save</Button>
                </div>
            )
        }

        return (
            <div>
            <h1>Imported Public Holidays</h1>
                {elements}
                <hr />
                {previewElem}
            </div>
        );
    }
}

export default connector(PublicHolidaysComp);
