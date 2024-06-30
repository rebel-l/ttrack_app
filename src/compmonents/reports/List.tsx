import "./List.scss";

import React from "react";
import { Table } from "react-bootstrap";

import { List } from "../../models/Reports";

interface IProps {
    readonly list: List
}

export default class ListComp extends React.Component<IProps, any> {
    constructor (props: IProps) {
        super(props);
    }

    render () {
        const { list } = this.props;

        if (!list) {
            return null;
        }

        let workDaysPerReason = []
        for (let key in list.WorkDaysPerReason) {
            workDaysPerReason.push(<p key={key}><b>{key}</b>: {list.WorkDaysPerReason[key]}</p>)
        }

        let workDaysPerLocation = []
        for (let key in list.WorkDaysPerLocation) {
            workDaysPerLocation.push(<p key={key}><b>{key}</b>: {list.WorkDaysPerLocation[key]}</p>)
        }

        let warnings = []
        for (let key in list.Warnings) {
            warnings.push(<p key={key}><b>{key}</b>: {list.Warnings[key]}</p>)
        }

        return (
            <div>
                <h2>{list.Year}:</h2>
                <p>Start / End of Year: {list.FirstDay.toLocaleString()} / {list.LastDay.toLocaleString()}</p>
                <Table className="table small">
                    <tbody>
                    <tr>
                        <th>
                            Number of Days in the Year
                        </th>
                        <td>
                            {list.Days}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Number of Work Days in the Year
                        </th>
                        <td>
                            {list.WorkDays}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Number of Weekend Days in the Year
                        </th>
                        <td>
                            {list.DaysOnWeekend}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Public Holidays in the Year / On Workdays
                        </th>
                        <td>
                            {list.PublicHolidays} / {list.PublicHolidaysOnWorkdays}
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            Work Days per Reason
                        </th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {workDaysPerReason}
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            Work Days per Location
                        </th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {workDaysPerLocation}
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            Warnings
                        </th>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {warnings}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
